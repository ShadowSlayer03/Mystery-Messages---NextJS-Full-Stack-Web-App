import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/user.models";

type deleteMessageParam = {
  messageId: string;
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: deleteMessageParam }
) {
  const { messageId } = params;

  if (!messageId) {
    return NextResponse.json(
      {
        success: false,
        message: "Message ID Not Provided or Invalid!",
      },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "User Could Not be Found! Unable to Validate the Session.",
      },
      { status: 401 }
    );
  }

  const userId = session.user._id;

  try {
    const result = await UserModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: messageId } } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found! Invalid User ID.",
        },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Message Could Not be Deleted! Please Try Again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message Deleted Successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred while deleting the message: ",error)
    return NextResponse.json(
      {
        success: false,
        message: "An Error Occurred While Deleting the Message.",
      },
      { status: 500 }
    );
  }
}
