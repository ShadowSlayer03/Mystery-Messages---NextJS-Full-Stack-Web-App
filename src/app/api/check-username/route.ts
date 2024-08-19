// This route checks if the username is unique

import dbConnect from "@/db/dbConnect";
import UserModel from "@/models/user.models";
import { z } from "zod";
import { usernameValidate } from "@/schemas/signupZodSchema";
import { NextRequest, NextResponse } from "next/server";

const UsernameQuerySchema = z.object({
  username: usernameValidate,
});

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    console.log("Username obtained from params", queryParam?.username);

    const result = UsernameQuerySchema.safeParse(queryParam);

    console.log("Result returned after ZOD parsing", result);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message: usernameErrors
            ? usernameErrors.join(",")
            : "Please Provide a Valid Username!",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const userDoc = await UserModel.findOne({ username, isVerified: true });
    if (userDoc) {
      return NextResponse.json(
        {
          success: false,
          message: "Username Already Taken! Please Choose Another.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Username is Unique!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred while checking if username is unique!");
    return NextResponse.json(
      { success: false, message: "Error Checking Uniqueness of Username!" },
      { status: 500 }
    );
  }
}
