import { chatBot } from "@/lib/chatbot";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

const MAX_PROMPT_LENGTH = 1000; // characters

export async function POST(req: NextRequest) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "auth:messages.unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json()
    const { prompt } = body

    // --- Validation ---
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { message: "prompt is required and must be a string." },
        { status: 400 },
      );
    }

    if (prompt.trim().length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { message: `Prompt must be under ${MAX_PROMPT_LENGTH} characters.` },
        { status: 400 },
      );
    }

    // --- Fetch relevant blog context ---
    // Try keyword-matched blogs first
    let blogs = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: prompt, mode: "insensitive" } },
          { slug: { contains: prompt, mode: "insensitive" } },
          { category: { contains: prompt, mode: "insensitive" } },
          { content: { contains: prompt, mode: "insensitive" } },
        ],
      },
      take: 3,
      select: {
        title: true,
        slug: true,
        category: true,
        content: true,
        createdAt: true,
      },
    });

    // If no keyword match, fall back to the 3 most recent published blogs
    // so the AI always has some context about the platform
    if (blogs.length === 0) {
      blogs = await prisma.blog.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          title: true,
          slug: true,
          category: true,
          content: true,
          createdAt: true,
        },
      });
    }

    // Build compact context string (limit content preview to avoid large payloads)
    const context = blogs
      .map(
        (blog) =>
          `Title: ${blog.title}\nSlug: ${blog.slug}\nCategory: ${blog.category}\nContent preview: ${blog.content?.slice(0, 800) ?? "N/A"}`,
      )
      .join("\n---\n");

    // --- Call AI ---
    const answer = await chatBot(prompt.trim(), context);

    return NextResponse.json(answer, { status: 200 });
  } catch (error) {
    console.error("[chatbot route error]", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}

