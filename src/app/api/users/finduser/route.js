import User from "@/app/lib/modals/user_modal";
import { connect } from "@/app/lib/db/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connect();

  try {
    const reqbody = await req.json();
    const { email, username } = reqbody;

    if (!email && !username) {
      return NextResponse.json(
        {
          message: "Please fill in the input",
        },
        { status: 400 }
      );
    }

    const query = {};
    if (email) query.email = email;
    if (username) query.username = username;

    const user = await User.findOne(query);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const user_data = {
      username: user.username,
      email: user.email,
      id: user._id,
    };

    return NextResponse.json(
      {
        success: true,
        message: "User found successfully",
        user_data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};
