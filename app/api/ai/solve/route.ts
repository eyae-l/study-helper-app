import { NextRequest, NextResponse } from "next/server";
import { solveProblemWithGemini } from "@/lib/gemini-api";

export async function POST(request: NextRequest) {
  try {
    const { question, subject = "general" } = await request.json();

    if (!question || question.trim() === "") {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const solution = await solveProblemWithGemini(question, subject);

    return NextResponse.json({ solution });
  } catch (error: any) {
    console.error("Problem solving error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to solve problem" },
      { status: 500 }
    );
  }
}
