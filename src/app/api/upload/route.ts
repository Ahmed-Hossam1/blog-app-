import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "auth:messages.unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { message: "common:messages.no_file_uploaded" },
        { status: 400 },
      );
    }

    // ===== Validate File Type =====
    // Allow any standard image type, fallback to application/octet-stream just in case
    if (!file.type.startsWith("image/") && file.type !== "application/octet-stream") {
      console.error("[POST /api/upload] Invalid file type:", file.type);
      return NextResponse.json(
        { message: `Invalid file type: ${file.type || "unknown"}` },
        { status: 400 },
      );
    }

    // ===== Validate File Size =====
    if (!file.size || file.size > MAX_SIZE_BYTES) {
      console.error("[POST /api/upload] File size invalid:", file.size);
      return NextResponse.json(
        { message: "common:messages.file_too_large" },
        { status: 400 },
      );
    }

    /**
     * Cloudinary Node SDK does NOT accept a Browser `File` object.
     * It expects raw binary data (Buffer), a file path, or a Base64 string.
     *
     * So we convert:
     * File (browser object) → ArrayBuffer → Node.js Buffer
     *
     * Buffer represents the image as raw binary data
     * (internally something like: 0101010101...)
     * which Node.js and Cloudinary can understand.
     *
     * Note: Base64 would also work, but Buffer is more memory-efficient.
     */
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    /**
     * upload_stream uses a callback-based API.
     * Since we want to use `await`, we wrap it inside a Promise.
     *
     * This allows us to:
     * - Wait for the upload to finish
     * - Get the upload result
     * - Properly handle errors using try/catch
     */
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blog-app" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      // Send the buffer data to Cloudinary
      stream.end(buffer);
    });

    return NextResponse.json(
      {
        message: "common:messages.image_upload_success",
        url: result,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("[POST /api/upload]", error);
    return NextResponse.json(
      {
        message: "common:messages.upload_failed",
        error: error?.message || String(error),
        stack: error?.stack
      },
      { status: 500 },
    );
  }
}

