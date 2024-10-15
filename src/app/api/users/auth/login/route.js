import User from "@/app/lib/modals/user_modal";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connect } from "@/app/lib/db/db";

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.\/\\|`~])[a-zA-Z0-9!@#$%^&*()_\-+=\[\]{};:'",.\/\\|`~]{8,}$/;
  return passwordRegex.test(password);
};

const secret = process.env.JWT_SECRET;

export const POST = async (req) => {
  connect();
  try {
    const reqbody = await req.json();
    const { email, password } = reqbody;

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

    if (!user) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      );
    }

    const isverified = user.isuserverified;
    if (!isverified) {
      return NextResponse.json(
        { message: "pls verify your email first" },
        { status: 310 }
      );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 402 }
      );
    }
    
    const userdata = {
      username: user.username,
      email: user.email,
      createdat: user.createdAt,
      isuserverified: user.isuserverified,
      id: user._id,
    };
    const mechat_token = jwt.sign(userdata, secret, {
      expiresIn: "6d",
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "login successfully",
      },
      { status: 200 }
    );
    response.cookies.set("mechat_token", mechat_token, { httpOnly: true });

    return response;
  } catch (err) {
    return NextResponse.json({ message: err?.message }, { status: 500 });
    console.log("error on login", err?.message);
  }
};
