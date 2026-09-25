import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all study sets for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const studySets = await prisma.studySet.findMany({
      where: { userId },
      include: {
        _count: {
          select: {
            flashcards: true,
            quizzes: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(studySets);
  } catch (error) {
    console.error("Error fetching study sets:", error);
    return NextResponse.json(
      { error: "Failed to fetch study sets" },
      { status: 500 }
    );
  }
}

// POST create new study set
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, subject, userId, isPublic = false } = body;

    if (!title || !subject || !userId) {
      return NextResponse.json(
        { error: "Title, subject, and userId are required" },
        { status: 400 }
      );
    }

    const studySet = await prisma.studySet.create({
      data: {
        title,
        description,
        subject,
        userId,
        isPublic,
      },
    });

    return NextResponse.json(studySet, { status: 201 });
  } catch (error) {
    console.error("Error creating study set:", error);
    return NextResponse.json(
      { error: "Failed to create study set" },
      { status: 500 }
    );
  }
}

// DELETE study set
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Study set ID is required" },
        { status: 400 }
      );
    }

    await prisma.studySet.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Study set deleted successfully" });
  } catch (error) {
    console.error("Error deleting study set:", error);
    return NextResponse.json(
      { error: "Failed to delete study set" },
      { status: 500 }
    );
  }
}
