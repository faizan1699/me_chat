import { connect } from "@/app/lib/db/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connect();
  try {

    const reqbody = await req.json();
    const { email, otp } = reqbody();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "pls fill the required inputs" },
        { status: 400 }
      );
    }
    
  } catch (error) {
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
};
