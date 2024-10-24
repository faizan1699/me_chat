import { NextResponse } from "next/server";
import { connect } from "@/app/lib/db/db";
import User from "@/app/lib/modals/user_modal";
import { JWT_TOKEN } from "@/app/lib/jwt/jwt";
import { sendVerificationEmail } from "@/app/lib/mail/user_verification/mailer";

import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const POST = async (req) => {
  await connect();

  const token = JWT_TOKEN(req);
  const useremail = token.email;

  try {
    const reqbody = await req.json();
    const { avatar, username, email, bio } = reqbody;

    const user = await User.findOne({ email: useremail });
    // if (!user) {
    //   return NextResponse.json({ message: "User not found" }, { status: 404 });
    // }

    user.isuserverified = email !== useremail ? false : true;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;
    user.username = username || user.username;

    let ifemail = false;

    if (email === useremail) {
      ifemail = false;
    } else {
      ifemail = true;
    }

    await user.save();

    const userdata = {
      username: user.username,
      email: user.email,
      createdat: user.createdAt,
      isuserverified: user.isuserverified,
      id: user._id,
      bio: user.bio,
    };
    const mechat_token = jwt.sign(userdata, secret, {
      expiresIn: "6d",
    });

    const response = NextResponse.json({
      success: true,
      emailchange: ifemail,
      message: ifemail
        ? "A new email verification link has been sent to your email, and your profile has been updated successfully. For security purposes, you have been logged out for this session."
        : "Profile updated successfully. For security purposes, you have been logged out for this session.",
    });

    if (email === useremail) {
      response.cookies.delete("mechat_token");
    }
    if (email !== useremail) {
      response.cookies.set("mechat_token", mechat_token, { httpOnly: true });
    }

    return response;
  } catch (error) {
    console.error("Error updating user profile:", error?.message); // Log the error for debugging
    return NextResponse.json(
      {
        message: error?.message || "An error occurred",
        success: false,
      },
      { status: 500 }
    );
  }
};
