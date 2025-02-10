import { generateObject } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { z } from "zod";
import { NextResponse } from "next/server";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST() {
  try {
    const { object } = await generateObject({
      model: groq("deepseek-r1-distill-llama-70b"),
      schema: z.object({
        Wish: z.array(z.string()).length(1),
      }),
      prompt: `
          You are a gentle man, help me generate a wish for my beautiful friend in Women's Day.
        `,
    });
    return NextResponse.json(object);
  } catch (error) {
    console.error("Error:", error); // Log lỗi để debug
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
