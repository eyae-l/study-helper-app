import { NextRequest, NextResponse } from "next/server";
import { generateSummaryWithGemini } from "@/lib/gemini-api";

export async function POST(request: NextRequest) {
  try {
    const { content, length = "medium" } = await request.json();

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const summary = await generateSummaryWithGemini(content, length);

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("Summarization error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate summary" },
      { status: 500 }
    );
  }
}
