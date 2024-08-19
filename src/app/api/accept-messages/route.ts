import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import dbConnect from "@/db/dbConnect";
import UserModel from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

// To toggle whether user wants to accept messages or not.
export async function POST(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  console.log("Session in accepting-messages POST route", session);

  const userFromSession: User = session?.user as User;

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed! Unable to Toggle Message Acceptance.",
      },
      { status: 400 }
    );
  }

  // We just need to update the isAcceptingMessages field in the DB.
  // The changing of the value in the session is handled by the GET function below.

  try {
    const userDoc = await UserModel.findOne({
      username: userFromSession.username,
    });
    if (!userDoc) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User Could Not be Found! Unable to Validate the Session.",
        },
        { status: 400 }
      );
    }

    userDoc.isAcceptingMessage = !userDoc?.isAcceptingMessage;
    const savedDoc = await userDoc.save();

    return NextResponse.json(
      {
        success: true,
        message: "Toggle Message Acceptance Successful!",
        isAcceptingMessages: savedDoc?.isAcceptingMessage
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred while toggling message acceptance", error);
    return NextResponse.json(
      {
        success: false,
        message: "Toggle Message Acceptance Failed!",
      },
      { status: 500 }
    );
  }
}

// Simply get the current isAcceptingMessages value.
export async function GET(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const userFromSession: User = session?.user as User;

  if (!session || !userFromSession) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed! Unable to Validate the Session.",
      },
      { status: 400 }
    );
  }

  const userId = userFromSession._id;

  try {
    const userDoc = await UserModel.findById(userId);

    if (!userDoc) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User Could Not be Found! Could Not Get User's Current Message Acceptance Status. ",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Fetched User's Current Message Acceptance Status Successfully!",
        isAcceptingMessages: userDoc.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "Error occurred in fetching user's isAcceptingMessage status:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        message: "Error in Fetching User's Message Acceptance Status!",
      },
      { status: 500 }
    );
  }
}
