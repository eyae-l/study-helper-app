import { NextRequest, NextResponse } from "next/server";
import { generateFlashcardsWithGemini } from "@/lib/gemini-api";
import { generateMockFlashcards } from "@/lib/mock-flashcards";
import { prisma } from "@/lib/prisma";

// GET flashcards for a study set
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studySetId = searchParams.get("studySetId");
    const userId = searchParams.get("userId");

    if (!studySetId || !userId) {
      return NextResponse.json(
        { error: "Study set ID and user ID are required" },
        { status: 400 }
      );
    }

    const flashcards = await prisma.flashcard.findMany({
      where: {
        studySetId,
        userId,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(flashcards);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return NextResponse.json(
      { error: "Failed to fetch flashcards" },
      { status: 500 }
    );
  }
}

// POST generate and save flashcards
export async function POST(request: NextRequest) {
  try {
    const { content, count = 10, studySetId, userId } = await request.json();

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Content is required to generate flashcards" },
        { status: 400 }
      );
    }

    if (!studySetId || !userId) {
      return NextResponse.json(
        { error: "Study set ID and user ID are required" },
        { status: 400 }
      );
    }

    console.log("Generating flashcards with count:", count);
    
    let flashcardsData;
    
    try {
      // Try to generate with Gemini AI first
      const flashcardsText = await generateFlashcardsWithGemini(content, count);
      // Clean the response - remove markdown code blocks if present
      const cleanedText = flashcardsText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      flashcardsData = JSON.parse(cleanedText);
      console.log("Successfully generated with Gemini AI:", flashcardsData.length);
    } catch (aiError) {
      console.log("AI generation failed, using mock flashcards:", aiError);
      // Fallback to mock flashcards if AI fails
      flashcardsData = generateMockFlashcards(content, count);
      console.log("Generated mock flashcards:", flashcardsData.length);
    }

    // Save flashcards to database
    const savedFlashcards = await prisma.flashcard.createMany({
      data: flashcardsData.map((card: any) => ({
        front: card.question,
        back: card.answer,
        studySetId,
        userId,
        difficulty: 1,
      })),
    });

    // Fetch the created flashcards
    const flashcards = await prisma.flashcard.findMany({
      where: {
        studySetId,
        userId,
      },
      orderBy: { createdAt: "desc" },
      take: count,
    });

    return NextResponse.json({ flashcards, count: savedFlashcards.count });
  } catch (error: any) {
    console.error("Flashcard generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate flashcards" },
      { status: 500 }
    );
  }
}

// PUT update flashcard
export async function PUT(request: NextRequest) {
  try {
    const { id, front, back, difficulty, nextReview } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Flashcard ID is required" },
        { status: 400 }
      );
    }

    const flashcard = await prisma.flashcard.update({
      where: { id },
      data: {
        ...(front && { front }),
        ...(back && { back }),
        ...(difficulty && { difficulty }),
        ...(nextReview && { nextReview: new Date(nextReview) }),
        reviewCount: { increment: 1 },
      },
    });

    return NextResponse.json(flashcard);
  } catch (error) {
    console.error("Error updating flashcard:", error);
    return NextResponse.json(
      { error: "Failed to update flashcard" },
      { status: 500 }
    );
  }
}

// DELETE flashcard
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Flashcard ID is required" },
        { status: 400 }
      );
    }

    await prisma.flashcard.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    return NextResponse.json(
      { error: "Failed to delete flashcard" },
      { status: 500 }
    );
  }
}
