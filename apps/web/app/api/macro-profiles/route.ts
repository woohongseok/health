import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      userId,
      gender,
      age,
      height,
      weight,
      lifestyle,
      exerciseLevel,
      exerciseFrequency,
      healthLevel,
    } = body;

    if (
      !userId ||
      !gender ||
      !age ||
      !height ||
      !weight ||
      !lifestyle ||
      !exerciseLevel ||
      !exerciseFrequency ||
      !healthLevel
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const macroProfile = await prisma.userProfile.create({
      data: {
        id: userId,
        gender,
        age: parseInt(age),
        height: parseFloat(height),
        weight: parseFloat(weight),
        lifestyle,
        exerciseLevel,
        exerciseFrequency,
        healthLevel,
      },
    });

    return NextResponse.json(macroProfile, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "유저 생성에 실패했습니다." }, { status: 500 });
  }
}
