import User from "@/app/lib/modals/user_modal";
import { connect } from "@/app/lib/db/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connect();

  try {
    const reqbody = await req.json();
    const { email } = reqbody;

    if (!email) {
      return NextResponse.json(
        {
          message: "email required",
        },
        { status: 404 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "user not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
