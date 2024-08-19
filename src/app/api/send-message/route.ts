import dbConnect from "@/db/dbConnect";
import UserModel from "@/models/user.models";
import { Message } from "@/models/message.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found! Message Could Not be Sent.",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Accepting Messages at the Moment!",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();

    return NextResponse.json(
        { success: true, message: "Message Sent Successfully!" },
        { status: 200 }
      );

  } catch (error) {
    console.error("Error occurred while sending message!:", error);
    return NextResponse.json(
      { success: false, message: "Error Occurred While Sending the Message!" },
      { status: 500 }
    );
  }
}
