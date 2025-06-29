import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check if the credentials match the expected values
    if (email === "eve.holt@reqres.in" && password === "cityslicka") {
      return NextResponse.json({
        success: true,
        token: "QpwL5tke4Pnpja7X4"
      });
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
} 