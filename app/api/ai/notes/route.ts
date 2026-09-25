import { NextRequest, NextResponse } from "next/server";
import { generateSmartNotesWithGemini } from "@/lib/gemini-api";

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const notes = await generateSmartNotesWithGemini(content);

    return NextResponse.json({ notes });
  } catch (error: any) {
    console.error("Smart notes error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate notes" },
      { status: 500 }
    );
  }
}
