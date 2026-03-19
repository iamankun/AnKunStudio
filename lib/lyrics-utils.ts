export interface LyricLine {
  id: number;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  text: string;
  section?: string;  // e.g. "Verse", "Rap", "Chorus"
  words: LyricWord[];
}

export interface LyricWord {
  text: string;
  startTime: number;
  endTime: number;
}

/**
 * Load LRC file from URL
 */
export async function loadLRC(url: string): Promise<LyricLine[]> {
  const response = await fetch(url);
  const content = await response.text();
  return parseSRT(content);
}

/**
 * Load structured JSON lyrics from URL (Apple Music Style)
 */
export async function loadJSONLyrics(url: string): Promise<LyricLine[]> {
  const response = await fetch(url);
  const json = await response.json();
  
  // Ensure we assign arbitrary IDs to JSON chunks if missing
  const lines: LyricLine[] = json.map((line: LyricLine & { id?: number }, index: number) => ({
    ...line,
    id: line.id || index + 1,
    section: line.section || 'Verse',
    words: line.words || [],
  }));

  // Fix: Extend last word's endTime to next line's startTime (max 5s cap)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1];
    
    if (line.words && line.words.length > 0) {
      const lastWord = line.words[line.words.length - 1];
      // If last word has no duration or ends too early, extend it
      const nextStartTime = nextLine ? nextLine.startTime : (line.endTime || lastWord.startTime + 5);
      const maxEndTime = lastWord.startTime + 5; // 5 second max cap
      
      if (lastWord.endTime <= lastWord.startTime || lastWord.endTime > nextStartTime) {
        // Word has zero duration or extends past next line - fix it
        lastWord.endTime = Math.min(nextStartTime, maxEndTime);
      }
      
      // IMPORTANT: Also update the line's endTime to match the last word's extended endTime
      // so getCurrentLine keeps this line active during the word's animation
      line.endTime = lastWord.endTime;
    }
  }
  
  return lines;
}

/**
 * Parse SRT or LRC content to structured lyrics data
 * Supports both line-level and word-level timestamps
 */
export function parseSRT(srtContent: string): LyricLine[] {
  const lines: LyricLine[] = [];
  
  // Check if it's LRC format (starts with [mm:ss.ms])
  const isLRC = srtContent.trim().startsWith('[') || srtContent.includes('[00:');
  
  if (isLRC) {
    // Parse LRC format
    const lrcLines = srtContent.trim().split('\n');
    let id = 1;
    let currentSection = 'Verse';
    
    for (const line of lrcLines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      // Parse UI section tags
      if (trimmed.startsWith('#')) {
        currentSection = trimmed.substring(1).trim();
        continue;
      }
      
      // Try Enhanced LRC format first (word-level timestamps)
      const enhanced = parseEnhancedLRC(trimmed);
      if (enhanced) {
        lines.push({
          id: id++,
          startTime: enhanced.startTime,
          endTime: enhanced.endTime,
          text: enhanced.text,
          section: currentSection,
          words: enhanced.words,
        });
        continue;
      }
      
      // Standard LRC format [mm:ss.ms] text
      const match = trimmed.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]\s*(.+)/);
      if (!match) continue;
      
      const mins = parseInt(match[1]);
      const secs = parseInt(match[2]);
      const ms = parseInt(match[3].padEnd(3, '0'));
      const text = match[4].trim();
      
      const startTime = mins * 60 + secs + ms / 1000;
      
      lines.push({
        id: id++,
        startTime,
        // Estimate end time based on next line or add 3 seconds later
        endTime: startTime + 3,
        text,
        section: currentSection,
        words: [], // populated after finding true end times
      });
    }
    
    // Update end times based on next line's start time
    for (let i = 0; i < lines.length - 1; i++) {
      lines[i].endTime = lines[i + 1].startTime;
    }
    
    // Calculate simulated word timings now that lines have true end times
    for (const line of lines) {
      if (line.words.length === 0 && line.text) {
        const words = line.text.split(/\s+/).filter(w => w.length > 0);
        // Constrain duration to max 5 seconds so words don't stretch forever in long instrumental gaps
        const totalDuration = Math.min(line.endTime - line.startTime, 5);
        const wordDuration = totalDuration / words.length;
        
        line.words = words.map((word, idx) => ({
          text: word,
          startTime: line.startTime + idx * wordDuration,
          endTime: line.startTime + (idx + 1) * wordDuration - (wordDuration * 0.1), // 10% gap
        }));
      }
    }
    
    return lines;
  }
  
  // Parse SRT format (existing logic)
  const blocks = srtContent.trim().split(/\n\s*\n/);
  let currentSection = 'Verse';

  for (const block of blocks) {
    const lines_in_block = block.trim().split('\n');
    if (lines_in_block.length < 2) continue;

    // Check if block is just a section tag
    if (lines_in_block[0].trim().startsWith('#')) {
       currentSection = lines_in_block[0].trim().substring(1).trim();
       if (lines_in_block.length === 1) continue; 
       // Remove tag from processing lines if attached to actual text block
       lines_in_block.shift(); 
    }

    // Parse ID
    const id = parseInt(lines_in_block[0].trim());
    if (isNaN(id)) continue;

    // Parse timestamp line
    const timeLine = lines_in_block[1].trim();
    const timeMatch = timeLine.match(
      /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/
    );
    if (!timeMatch) continue;

    const startTime = 
      parseInt(timeMatch[1]) * 3600 +
      parseInt(timeMatch[2]) * 60 +
      parseInt(timeMatch[3]) +
      parseInt(timeMatch[4]) / 1000;

    const endTime = 
      parseInt(timeMatch[5]) * 3600 +
      parseInt(timeMatch[6]) * 60 +
      parseInt(timeMatch[7]) +
      parseInt(timeMatch[8]) / 1000;

    // Parse text (can be multiple lines)
    const textLines = lines_in_block.slice(2);
    const fullText = textLines.join(' ').trim();

    // Split into words for word-level sync
    // For now, estimate word timing evenly across the line duration
    const words = fullText.split(/\s+/).filter(w => w.length > 0);
    const wordDuration = (endTime - startTime) / words.length;
    
    const lyricWords: LyricWord[] = words.map((word, idx) => ({
      text: word,
      startTime: startTime + idx * wordDuration,
      endTime: startTime + (idx + 1) * wordDuration,
    }));

    lines.push({
      id,
      startTime,
      endTime,
      text: fullText,
      section: currentSection,
      words: lyricWords,
    });
  }

  return lines;
}

/**
 * Get current lyric line based on playback time
 */
export function getCurrentLine(lines: LyricLine[], currentTime: number): LyricLine | null {
  for (const line of lines) {
    if (currentTime >= line.startTime && currentTime < line.endTime) {
      return line;
    }
  }
  
  // Check if we're past the last line
  if (lines.length > 0 && currentTime >= lines[lines.length - 1].endTime) {
    return lines[lines.length - 1];
  }
  
  return null;
}

/**
 * Get current word in a line based on playback time
 */
export function getCurrentWord(line: LyricLine, currentTime: number): LyricWord | null {
  for (const word of line.words) {
    if (currentTime >= word.startTime && currentTime < word.endTime) {
      return word;
    }
  }
  return null;
}

/**
 * Get progress percentage of current word (0-100)
 */
export function getWordProgress(word: LyricWord, currentTime: number): number {
  if (currentTime < word.startTime) return 0;
  if (currentTime >= word.endTime) return 100;
  
  const duration = word.endTime - word.startTime;
  const elapsed = currentTime - word.startTime;
  return (elapsed / duration) * 100;
}

/**
 * Parse Enhanced LRC format with word-level timestamps
 * Format: [mm:ss.xx]<mm:ss.xx>word1 <mm:ss.xx>word2 <mm:ss.xx>word3
 * Returns null if not in enhanced format
 */
function parseEnhancedLRC(line: string): { startTime: number; endTime: number; text: string; words: LyricWord[] } | null {
  // Match line-level timestamp at start
  const lineTimeMatch = line.match(/^\[(\d{2}):(\d{2})\.(\d{2,3})\](.+)$/);
  if (!lineTimeMatch) return null;

  const lineMins = parseInt(lineTimeMatch[1]);
  const lineSecs = parseInt(lineTimeMatch[2]);
  const lineMs = parseInt(lineTimeMatch[3].padEnd(3, '0'));
  const lineStartTime = lineMins * 60 + lineSecs + lineMs / 1000;

  const content = lineTimeMatch[4];

  // Check if content has word-level timestamps
  // Pattern: <mm:ss.xx>word or <mm:ss.xxx>word
  const wordTimeRegex = /<(\d{2}):(\d{2})\.(\d{2,3})>/g;
  const hasWordTimestamps = wordTimeRegex.test(content);

  if (!hasWordTimestamps) return null;

  // Reset regex lastIndex
  wordTimeRegex.lastIndex = 0;

  const words: LyricWord[] = [];
  let fullText = '';

  // Extract word timestamps
  let match;
  const matches: { index: number; minStr: string; secStr: string; msStr: string; mins: number; secs: number; ms: number }[] = [];
  
  while ((match = wordTimeRegex.exec(content)) !== null) {
    matches.push({
      index: match.index,
      minStr: match[1],
      secStr: match[2],
      msStr: match[3],
      mins: parseInt(match[1]),
      secs: parseInt(match[2]),
      ms: parseInt(match[3].padEnd(3, '0')),
    });
  }

  // Process each word
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const next = matches[i + 1];
    
    const wordStartTime = current.mins * 60 + current.secs + current.ms / 1000;
    
    // dynamically determine length of the matched string to extract text accurately
    const tagLength = `<${current.minStr}:${current.secStr}.${current.msStr}>`.length;
    const textStart = current.index + tagLength;
    const textEnd = next ? next.index : content.length;
    
    const wordText = content.substring(textStart, textEnd).trim();
    
    if (wordText) {
      const wordEndTime = next 
        ? (next.mins * 60 + next.secs + next.ms / 1000)
        : wordStartTime + 0.5;

      words.push({
        text: wordText,
        startTime: wordStartTime,
        endTime: wordEndTime,
      });

      fullText += (fullText ? ' ' : '') + wordText;
    }
  }

  if (words.length === 0) return null;

  return {
    startTime: lineStartTime,
    endTime: words[words.length - 1].endTime,
    text: fullText,
    words,
  };
}

/**
 * Calculate drift between expected and actual timing
 * Useful for auto-adjustment
 */
export function calculateDrift(
  lyrics: LyricLine[],
  expectedTime: number,
  actualTime: number
): number {
  // Find the closest lyric line to expected time
  let closestLine = lyrics[0];
  let minDiff = Math.abs(lyrics[0].startTime - expectedTime);

  for (const line of lyrics) {
    const diff = Math.abs(line.startTime - expectedTime);
    if (diff < minDiff) {
      minDiff = diff;
      closestLine = line;
    }
  }

  // Calculate drift
  return actualTime - closestLine.startTime;
}

/**
 * Auto-sync calibration using multiple sample points
 * More accurate than single-point calibration
 */
export function calibrateWithMultiplePoints(
  lyrics: LyricLine[],
  samples: { expectedTime: number; actualTime: number }[]
): number {
  if (samples.length === 0) return 0;
  if (samples.length === 1) return samples[0].actualTime - samples[0].expectedTime;

  // Calculate average drift
  let totalDrift = 0;
  for (const sample of samples) {
    const drift = calculateDrift(lyrics, sample.expectedTime, sample.actualTime);
    totalDrift += drift;
  }

  return totalDrift / samples.length;
}
