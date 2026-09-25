import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const demoUser = {
      id: "demo-user-123",
      email: "demo@studyhelper.com",
      name: "Demo User",
    };

    // Check if demo user exists
    let user = await prisma.user.findUnique({
      where: { id: demoUser.id },
    });

    // Create demo user if doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: demoUser.id,
          email: demoUser.email,
          name: demoUser.name,
          password: "demo-password-hash", // Not used in demo mode
        },
      });
      console.log("Created demo user");
    }

    // Check if demo study set exists
    const existingSets = await prisma.studySet.findMany({
      where: { userId: demoUser.id },
    });

    if (existingSets.length > 0) {
      return NextResponse.json({
        success: true,
        studySet: existingSets[0],
        message: "Demo data already exists",
      });
    }

    // Create demo study set
    const studySet = await prisma.studySet.create({
      data: {
        title: "Introduction to JavaScript",
        description: "Learn the basics of JavaScript programming",
        subject: "Computer Science",
        userId: demoUser.id,
        isPublic: false,
      },
    });

    return NextResponse.json({
      success: true,
      studySet,
      message: "Demo data initialized",
    });
  } catch (error) {
    console.error("Error initializing demo data:", error);
    return NextResponse.json(
      { error: "Failed to initialize demo data" },
      { status: 500 }
    );
  }
}
