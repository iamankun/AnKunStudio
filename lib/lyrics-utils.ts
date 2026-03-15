export interface LyricLine {
  id: number;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  text: string;
  words: LyricWord[];
}

export interface LyricWord {
  text: string;
  startTime: number;
  endTime: number;
}

/**
 * Parse SRT content to structured lyrics data
 * Supports both line-level and word-level timestamps
 */
export function parseSRT(srtContent: string): LyricLine[] {
  const lines: LyricLine[] = [];
  const blocks = srtContent.trim().split(/\n\s*\n/);

  for (const block of blocks) {
    const lines_in_block = block.trim().split('\n');
    if (lines_in_block.length < 2) continue;

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
 * Load SRT file from URL
 */
export async function loadSRT(url: string): Promise<LyricLine[]> {
  const response = await fetch(url);
  const content = await response.text();
  return parseSRT(content);
}
