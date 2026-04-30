import { GoogleGenerativeAI } from "@google/generative-ai";

// Next.js automatically loads .env.local — no need for dotenv
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `
You are a helpful AI assistant embedded inside a blog platform.

Your responsibilities:
- Help users discover, understand, and navigate blog articles.
- Answer questions based ONLY on the provided blog context.
- If no relevant blog is found, politely say so and suggest the user browse the blog section.
- Keep your answers concise, friendly, and well-structured.
- If recommending a blog, always mention its title and slug (e.g. "You can read it at /blog/[slug]").
- Do NOT make up blog content that wasn't provided to you.
- Respond in the same language the user is writing in.
  `.trim(),
});

export async function chatBot(
  prompt: string,
  context: string,
): Promise<string> {
  const messageWithContext = context
    ? `Blog context available:\n${context}\n\nUser question: ${prompt}`
    : `User question: ${prompt}`;

  const result = await model.generateContent(messageWithContext);
  const response = result.response;
  return response.text();
}
