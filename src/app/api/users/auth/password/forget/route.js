import { connect } from "@/app/lib/db/db";
import { NextResponse } from "next/server";
import User from "@/app/lib/modals/user_modal";
import bcrypt from "bcryptjs";

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.\/\\|`~])[a-zA-Z0-9!@#$%^&*()_\-+=\[\]{};:'",.\/\\|`~]{8,}$/;
  return passwordRegex.test(password);
};

export const POST = async (req) => {
  await connect();

  try {
    const reqbody = await req.json();
    const { email, otp, newpassword } = reqbody;

    if (!otp) {
      return NextResponse.json(
        {
          message: "otp required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(newpassword, salt);

    user.otp = undefined;
    user.forget_password_otp = undefined;
    user.password = hashedpassword;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "password changed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error?.message);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
};
