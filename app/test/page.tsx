"use client";

import { useEffect, useRef, useState } from "react";

const TRACKS = [
  { id: "1", title: "Refrigerator & Box", url: "/api/tracks/RefrigeratorBox.mp3", cover: "/tracks/RefrigeratorBox.jpg" },
  { id: "2", title: "Cứ Bước Đi", url: "/api/tracks/cubuocdi.wav", cover: "/tracks/cubuocdi.jpg" },
  { id: "3", title: "Đừng Lo Đến Anh", url: "/api/tracks/dunglodenanh.m4a", cover: "/tracks/dung-lo-den-anh.jpg" },
  { id: "4", title: "Nếu Như", url: "/api/tracks/neunhu.wav", cover: "https://t2.genius.com/unsafe/344x344/https%3A%2F%2Fimages.genius.com%2F95435768cd84f1b6a7af36f182b20a54.500x500x1.jpg" },
  { id: "5", title: "Destiny", url: "/api/tracks/destiny.wav", cover: "/tracks/Willdawind - DESTINY ft Bao Han Helia.jpg" },
];

export default function TestPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [loadTime, setLoadTime] = useState(0);
  const loadStart = useRef(0);

  const log = (msg: string) => setLogs((prev) => [msg, ...prev].slice(0, 50));

  function play(url: string) {
    setError(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setCurrent(url);

    const audio = new Audio();
    audio.preload = "metadata";
    loadStart.current = Date.now();

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
      log(`Metadata loaded: ${audio.duration.toFixed(1)}s`);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    });

    audio.addEventListener("canplaythrough", () => {
      setLoadTime(Date.now() - loadStart.current);
      log(`Ready in ${Date.now() - loadStart.current}ms`);
    });

    audio.addEventListener("error", () => {
      const err = audio.error;
      setError(`Error ${err?.code}: ${err?.message || "Unknown"}`);
      log(`ERROR [${err?.code}]: ${err?.message || "Unknown"}`);
    });

    audio.addEventListener("ended", () => {
      setPlaying(false);
      log("Track ended");
    });

    audio.src = url;
    audioRef.current = audio;

    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => {
          setPlaying(true);
          log(`Playing: ${TRACKS.find((t) => t.url === url)?.title}`);
        })
        .catch((err) => {
          setError(err.message);
          log(`Play failed: ${err.message}`);
        });
    }
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch((e) => setError(e.message));
    }
  }

  function seek(value: number) {
    if (audioRef.current && duration) {
      audioRef.current.currentTime = (value / 100) * duration;
      setProgress(value);
    }
  }

  const track = TRACKS.find((t) => t.url === current);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 20px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Test Player</h1>

      {/* Track list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {TRACKS.map((t) => (
          <button
            key={t.id}
            onClick={() => play(t.url)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              borderRadius: 10,
              border: current === t.url ? "2px solid #0066ff" : "1px solid #ddd",
              background: current === t.url ? "#e8f0ff" : "#fff",
              cursor: "pointer",
              textAlign: "left",
              fontSize: 14,
            }}
          >
            <img src={t.cover} alt="" width={40} height={40} style={{ borderRadius: 6, objectFit: "cover" }} />
            <span>{t.title}</span>
            <span style={{ marginLeft: "auto", fontSize: 12, color: "#666" }}>{t.url.match(/\.(\w+)$/)?.[1]}</span>
          </button>
        ))}
      </div>

      {/* Player */}
      {track && (
        <div style={{ background: "#f5f5f5", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <img src={track.cover} alt="" width={64} height={64} style={{ borderRadius: 8, objectFit: "cover" }} />
            <div>
              <div style={{ fontWeight: 600 }}>{track.title}</div>
              <div style={{ fontSize: 12, color: "#666" }}>
                {duration > 0 ? `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, "0")} / ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")}` : "Loading..."}
              </div>
              {loadTime > 0 && <div style={{ fontSize: 11, color: loadTime < 500 ? "green" : loadTime < 2000 ? "orange" : "red" }}>Load: {loadTime}ms</div>}
            </div>
            <button
              onClick={togglePlay}
              style={{
                marginLeft: "auto",
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "none",
                background: "#0066ff",
                color: "#fff",
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              {playing ? "⏸" : "▶"}
            </button>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            style={{ width: "100%" }}
          />

          {error && (
            <div style={{ marginTop: 12, padding: 10, background: "#ffe0e0", borderRadius: 8, fontSize: 13, color: "#c00" }}>
              {error}
            </div>
          )}
        </div>
      )}

      {/* Range request test */}
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={async () => {
            if (!current) return;
            const start = Date.now();
            try {
              const res = await fetch(current, { headers: { Range: "bytes=0-1023" } });
              const status = res.status;
              const cr = res.headers.get("content-range");
              log(`Range test: HTTP ${status} | Content-Range: ${cr || "none"} (${Date.now() - start}ms)`);
            } catch (e: unknown) {
              log(`Range test FAILED: ${e instanceof Error ? e.message : String(e)}`);
            }
          }}
          style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontSize: 13, marginRight: 8 }}
        >
          Test Range Request
        </button>
        <span style={{ fontSize: 12, color: "#666" }}>
          {current ? `Current: ${current}` : "Select a track first"}
        </span>
      </div>

      {/* Logs */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#666" }}>Logs</div>
        <div style={{ fontSize: 12, fontFamily: "monospace", background: "#1a1a1a", color: "#0f0", padding: 12, borderRadius: 8, maxHeight: 300, overflowY: "auto" }}>
          {logs.length === 0 ? <span style={{ color: "#666" }}>No logs yet</span> : logs.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}
