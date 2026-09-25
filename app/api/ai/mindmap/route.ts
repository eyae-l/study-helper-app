import { NextRequest, NextResponse } from "next/server";
import { generateMindMapWithGemini } from "@/lib/gemini-api";

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const mindMapText = await generateMindMapWithGemini(content);
    
    // Parse the JSON response - clean markdown if present
    let mindMap;
    try {
      const cleanedText = mindMapText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      mindMap = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse mind map response:", mindMapText);
      throw new Error("Invalid JSON response from AI");
    }

    return NextResponse.json({ mindMap });
  } catch (error: any) {
    console.error("Mind map error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate mind map" },
      { status: 500 }
    );
  }
}
