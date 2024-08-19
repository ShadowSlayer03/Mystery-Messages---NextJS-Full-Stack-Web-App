import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: NextRequest) {
  const { prompt }: { prompt: string } = await req.json();

  try {
    const result = await streamText({
      model: google("models/gemini-1.5-pro-latest"),
      prompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error occurred in generating text from AI:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error Occurred In Generating Response From AI!",
        error,
      },
      { status: 500 }
    );
  }
}

/*
// React part to stream text

*/
