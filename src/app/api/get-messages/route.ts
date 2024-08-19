import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/db/dbConnect";
import UserModel from "@/models/user.models";
import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "User Could Not be Found! Unable to Validate the Session.",
      },
      { status: 400 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const result = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No messages found for this user.",
          returnedMessages: [],
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Messages retrieved successfully.",
      returnedMessages: result[0].messages,
    });
  } catch (error) {
    console.error("Error occurred in getting all messages:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error Occurred in Getting All User Messages!",
      },
      { status: 500 }
    );
  }
}

