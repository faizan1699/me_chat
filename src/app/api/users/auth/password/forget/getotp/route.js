import { connect } from "@/app/lib/db/db";
import { NextResponse } from "next/server";
import { sendresetpasswordOTP } from "@/app/lib/mail/password/forget/forget";

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

export const POST = async (req) => {
  await connect();
  const otp = generateOTP();
  try {
    const reqbody = await req.json();
    const { email } = reqbody;

    if (!email) {
      return NextResponse.json({ message: "email required" }, { status: 400 });
    }

    await sendresetpasswordOTP(email, otp);

    const response = NextResponse.json(
      {
        success: true,
        message: "OTP sent to your email successfully",
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
};
