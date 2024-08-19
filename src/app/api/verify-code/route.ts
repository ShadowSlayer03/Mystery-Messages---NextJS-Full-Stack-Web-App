import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect";
import UserModel from "@/models/user.models";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);
    const decodedVerifyCode = decodeURIComponent(code);
    
    const user: any = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User Not Found!" },
        { status: 400 }
      );
    }

    if (new Date(user.verifyCodeExpiry) < new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification Code Expired! User Could Not be Verified.",
        },
        { status: 401 }
      );
    }

    if (user.verifyCode !== decodedVerifyCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect Code Provided! User Could Not be Verified.",
        },
        { status: 401 }
      );
    }

    user.isVerified = true;
    const result = await user.save();

    return NextResponse.json(
      { success: true, message: "User Verified Successfully!", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Occurred while Verifying Code:", error);
    return NextResponse.json(
      { success: false, message: "Error occurred while Verification of Code!" },
      { status: 500 }
    );
  }
}
