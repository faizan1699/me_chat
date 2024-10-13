import nodemailer from "nodemailer";
import User from "../../modals/user_modal";
import jwt from "jsonwebtoken";
import { DateTime } from "luxon";

import { NextResponse } from "next/server";

const admin = process.env.ADMIN;
const pass = process.env.PASS;
const secret = process.env.JWT_SECRET;
const DOMAIN = process.env.DOMAIN;

export const sendVerificationEmail = async (email) => {
  try {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tokentExpiry = DateTime.now()
      .setZone(userTimezone)
      .plus({ hours: 2 });

    const emailVerificationToken = jwt.sign(email, secret);

    const updateFields = {
      email_verifiy_token: emailVerificationToken,
      email_verifiy_token_exo: tokentExpiry.toJSDate(),
    };

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const name = await user.username;

    Object.assign(user, updateFields);
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: admin,
        pass: pass,
      },
    });

    const mailOption = {
      from: admin,
      to: email,
      subject: "Verify email for ME _ CHAT",
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color: #4338ca; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px; padding: 20px;">
                            <img src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.bd1dcca1.png&w=64&q=75" alt="My Chat Logo" style="max-width: 150px; height: auto; display: block; margin: 0 auto;">
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="font-size: 24px; margin-top: 0; color: #4338ca; font-weight: bold;">Hello ${name},</h2>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Thank you for signing up for MY CHAT! To complete your registration and activate your account, please verify your email address by clicking the button below.</p>
                            <a href="${DOMAIN}/verifyemail?token=${emailVerificationToken}" style="display: inline-block; padding: 12px 25px; font-size: 16px; color: #ffffff; background-color: #4338ca; text-decoration: none; border-radius: 5px; margin-top: 10px; font-weight: bold;">Verify Email</a>
                            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">Or copy and paste this link into your browser:</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0; word-break: break-word;">${DOMAIN}/verifyemail?token=${emailVerificationToken}</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">If you did not create an account with MY CHAT, please ignore this email.</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0;">If you have any questions or need further assistance, feel free to contact our support team.</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0 0;">Thank you for joining us!</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0;">Best regards,<br>The MY CHAT Team</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #4338ca; color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; padding: 20px;">
                            <p style="margin: 0; font-size: 14px;">&copy; ${new Date().getFullYear()} MY CHAT. All rights reserved.</p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
        `,
    };

    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};
