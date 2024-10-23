import { NextResponse } from "next/server";
import { connect } from "@/app/lib/db/db";
import User from "@/app/lib/modals/user_modal";
import { JWT_TOKEN } from "@/app/lib/jwt/jwt";
import { sendVerificationEmail } from "@/app/lib/mail/user_verification/mailer";

export const POST = async (req) => {
  await connect();

  const token = JWT_TOKEN(req);
  const useremail = token.email;
  console.log("Current user email:", useremail);

  try {
    const reqbody = await req.json();
    const { avatar, username, newemail, bio } = reqbody;
    console.log("New email from user:", newemail);

    const user = await User.findOne({ email: useremail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.isuserverified = newemail !== useremail && false;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;
    user.username = username || user.username;

    let ifnewemail = false;

    await user.save();

    const response = NextResponse.json({
      success: true,
      message: ifnewemail
        ? "A new email verification link has been sent to your email, and your profile has been updated successfully. For security purposes, you have been logged out for this session."
        : "Profile updated successfully. For security purposes, you have been logged out for this session.",
    });

    if (newemail !== useremail) {
      response.cookies.set("mechat_token", undefined, { httpOnly: true });
    }

    return response;
  } catch (error) {
    console.error("Error updating user profile:", error); // Log the error for debugging
    return NextResponse.json(
      {
        message: error?.message || "An error occurred",
        success: false,
      },
      { status: 500 }
    );
  }
};
