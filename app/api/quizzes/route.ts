import { NextRequest, NextResponse } from "next/server";
import { generateQuizWithGemini } from "@/lib/gemini-api";
import { generateMockQuiz } from "@/lib/mock-flashcards";
import { prisma } from "@/lib/prisma";

// GET quizzes for a study set
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

    const quizzes = await prisma.quiz.findMany({
      where: {
        studySetId,
        userId,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
}

// POST generate and save quiz
export async function POST(request: NextRequest) {
  try {
    const {
      content,
      title,
      difficulty = "medium",
      count = 5,
      studySetId,
      userId,
    } = await request.json();

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Content is required to generate quiz" },
        { status: 400 }
      );
    }

    if (!studySetId || !userId) {
      return NextResponse.json(
        { error: "Study set ID and user ID are required" },
        { status: 400 }
      );
    }

    console.log("Generating quiz with difficulty:", difficulty);
    
    let questions;
    
    try {
      // Try to generate with Gemini AI first
      const quizText = await generateQuizWithGemini(content, difficulty, count);
      // Clean the response - remove markdown code blocks if present
      const cleanedText = quizText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      questions = JSON.parse(cleanedText);
      console.log("Successfully generated quiz with Gemini AI:", questions.length);
    } catch (aiError) {
      console.log("AI generation failed, using mock quiz:", aiError);
      // Fallback to mock quiz if AI fails
      questions = generateMockQuiz(content, difficulty, count);
      console.log("Generated mock quiz:", questions.length);
    }

    // Save quiz to database
    const quiz = await prisma.quiz.create({
      data: {
        title: title || `${difficulty} Quiz`,
        studySetId,
        userId,
        questions,
        totalScore: questions.length * 10, // 10 points per question
        completed: false,
      },
    });

    return NextResponse.json(quiz);
  } catch (error: any) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate quiz" },
      { status: 500 }
    );
  }
}

// PUT update quiz (mark as completed, update score)
export async function PUT(request: NextRequest) {
  try {
    const { id, completed, totalScore } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Quiz ID is required" },
        { status: 400 }
      );
    }

    const quiz = await prisma.quiz.update({
      where: { id },
      data: {
        ...(typeof completed === "boolean" && { completed }),
        ...(totalScore !== undefined && { totalScore }),
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Error updating quiz:", error);
    return NextResponse.json(
      { error: "Failed to update quiz" },
      { status: 500 }
    );
  }
}

// DELETE quiz
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Quiz ID is required" },
        { status: 400 }
      );
    }

    await prisma.quiz.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return NextResponse.json(
      { error: "Failed to delete quiz" },
      { status: 500 }
    );
  }
}
