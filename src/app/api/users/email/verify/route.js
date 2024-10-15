import { NextResponse } from "next/server";
import User from "@/app/lib/modals/user_modal";
import jwt from "jsonwebtoken";
import { connect } from "@/app/lib/db/db";

const secret = process.env.JWT_SECRET;

export const POST = async (req) => {
  connect();

  try {
    const reqbody = await req.json();
    const { token } = reqbody;

    if (!token) {
      return NextResponse.json({ message: "token required" }, { status: 400 });
    }

    const user = await User.findOne({ email_verifiy_token: token });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Token or expired token" },
        { status: 400 }
      );
    }

    try {
      jwt.verify(token, secret);

      user.isuserverified = true;
      user.email_verifiy_token = undefined;
      user.email_verifiy_token_exp = undefined;

      await user.save();

      return NextResponse.json(
        { message: "email verifed successfully" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ message: error?.message }, { status: 498 });
    }
  } catch (error) {
    console.log("error verifiy email", error?.message);
  }
};
