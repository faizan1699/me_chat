import User from "@/app/lib/modals/user_modal";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";
import { connect } from "@/app/lib/db/db";
import { sendVerificationEmail } from "@/app/lib/mail/user_verification/mailer";

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.\/\\|`~])[a-zA-Z0-9!@#$%^&*()_\-+=\[\]{};:'",.\/\\|`~]{8,}$/;
  return passwordRegex.test(password);
};
export const POST = async (req) => {
  connect();
  try {
    const reqbody = await req.json();
    const { username, email, password } = reqbody;

    if (!username) {
      return NextResponse.json(
        { message: "username required" },
        { status: 402 }
      );
    }
    if (!email) {
      return NextResponse.json({ message: "email required" }, { status: 402 });
    }
    if (!password) {
      return NextResponse.json(
        { message: "password required" },
        { status: 402 }
      );
    }
    if (!validatePassword(password)) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 8 characters long and include at least one number and one special character (!@#$%^&*).",
        },
        { status: 402 }
      );
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "Account already exist" },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newuser = new User({
      username,
      email,
      isuserverified: false,
      password: hashedpassword,
    });

    await newuser.save();
    await sendVerificationEmail(email);

    const response = NextResponse.json(
      {
        success: true,
        message:
          "Account Created Successfully and account email verification sent",
      },
      { status: 200 }
    );

    return response;
  } catch (err) {
    return NextResponse.json({ message: err?.message }, { status: 500 });
    console.log("error on register", err?.message);
  }
};
