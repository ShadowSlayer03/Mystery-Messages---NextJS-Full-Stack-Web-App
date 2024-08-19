import dbConnect from "@/db/dbConnect";
import UserModel from "@/models/user.models";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    // Check if the username is unique
    const userDocByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (userDocByUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "Username already taken! Please try a different one.",
        },
        {
          status: 400,
        }
      );
    }

    // Check if there already exists someone with that same email.
    const userDocByEmail = await UserModel.findOne({ email });

    let verifyCode = uuidv4();
    verifyCode = verifyCode.replace(/-/g, '').slice(0, 8);

    if (userDocByEmail) {
      if (userDocByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User already exists! Please log in.",
          },
          {
            status: 400,
          }
        );
      } else {
        // Update the verification token and expiry date, and update the password
        userDocByEmail.verifyCode = verifyCode;
        userDocByEmail.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry
        userDocByEmail.password = await bcrypt.hash(password, 10);

        const updatedUser = await userDocByEmail.save();
        if (!updatedUser) {
          return NextResponse.json(
            {
              success: false,
              message: "Error occurred! User could not be updated.",
            },
            {
              status: 500,
            }
          );
        }
      }
    } else {
      // Create a new user if no matching email is found
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiry
        isAcceptingMessage: true,
        messages: [],
      });

      const savedUser = await newUser.save();
      if (!savedUser) {
        return NextResponse.json(
          {
            success: false,
            message: "Error occurred! User could not be saved.",
          },
          {
            status: 500,
          }
        );
      }
    }

    const res = await sendVerificationEmail(email, username, verifyCode);
    if (res.success) console.log("Verification email sent successfully!");

    return NextResponse.json(
      {
        success: true,
        message:
          "User registered successfully! Please check your email to verify your account.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in user signup: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering the user! Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
