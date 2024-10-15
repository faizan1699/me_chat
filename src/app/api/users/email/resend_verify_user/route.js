import User from "@/app/lib/modals/user_modal";
import { connect } from "@/app/lib/db/db";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/app/lib/mail/user_verification/mailer";

export const POST = async (req) => {
  
    await connect();

  try {
    const reqbody = await req.json();
    const { email } = reqbody;

    if (!email) {
      return NextResponse.json(
        { message: "email required or pls put your email again" },
        { status: 422 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "user not found with this email" },
        { status: 422 }
      );
    }

    await sendVerificationEmail(email);

    const response = NextResponse.json(
      {
        message: "email sent successfully",
        success: true,
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: error?.message,
        success: false,
      },
      { status: 500 }
    );
  }
};
