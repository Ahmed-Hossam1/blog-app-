import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
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
        message: "Image uploaded successfully",
        url: result,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Upload failed ${error}` },
      { status: 500 },
    );
  }
}
