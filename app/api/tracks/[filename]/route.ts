import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const tracksDir = path.join(process.cwd(), "public", "tracks");

const mimeTypes: Record<string, string> = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  m4a: "audio/mp4",
  ogg: "audio/ogg",
  flac: "audio/flac",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  json: "application/json",
  lrc: "text/plain",
  srt: "text/plain",
};

export const dynamic = "force-dynamic";

export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return new NextResponse(null, { status: 403 });
  }

  const filePath = path.join(tracksDir, filename);
  if (!fs.existsSync(filePath)) {
    return new NextResponse(null, { status: 404 });
  }

  const ext = path.extname(filename).toLowerCase().slice(1);
  const contentType = mimeTypes[ext] || "application/octet-stream";
  const fileSize = fs.statSync(filePath).size;

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(fileSize),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const filePath = path.join(tracksDir, filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const ext = path.extname(filename).toLowerCase().slice(1);
  const contentType = mimeTypes[ext] || "application/octet-stream";
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  const rangeHeader = request.headers.get("range");

  if (rangeHeader) {
    const match = rangeHeader.replace(/bytes=/, "").split("-");
    const start = parseInt(match[0], 10);
    const end = match[1] ? parseInt(match[1], 10) : fileSize - 1;

    if (isNaN(start) || start >= fileSize) {
      return new NextResponse(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${fileSize}` },
      });
    }

    const clampedEnd = Math.min(end, fileSize - 1);
    const chunkSize = clampedEnd - start + 1;
    const stream = fs.createReadStream(filePath, { start, end: clampedEnd });

    return new NextResponse(stream as unknown as ReadableStream, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${clampedEnd}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Type": contentType,
        "Content-Length": String(chunkSize),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const stream = fs.createReadStream(filePath);

  return new NextResponse(stream as unknown as ReadableStream, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(fileSize),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
