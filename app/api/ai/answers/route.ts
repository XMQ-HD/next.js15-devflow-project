import handleError from "@/lib/handles/error";
import { ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question, content } = await req.json();

  try {
    const validateData = AIAnswerSchema.safeParse({ question, content });

    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }

    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: `Generate a markdown formatted answer for the following question: "${question}" based on the context: "${content}".`,
      system:
        "You are a helpful assistant that provides informative responses in markdown format. Use appropriate markdown syntax for headings, lists, code blocks, and emphasis where necessary. For code blocks, use short-form smaller case language identifiers (e.g., 'js' for JavaScript, 'py' for Python, 'ts' for TypeScript, 'html' for HTML, 'css' for CSS, etc.).",
    });

    return NextResponse.json({ success: true, data: text }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
