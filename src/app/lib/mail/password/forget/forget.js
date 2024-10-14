import nodemailer from "nodemailer";
import User from "../../modals/user_modal";

import { NextResponse } from "next/server";

const admin = process.env.ADMIN;
const pass = process.env.PASS;

export const resetpasswordOTP = async (email, otp) => {
  try {
    const updateFields = {
      forget_password_otp: otp,
    };

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

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
      subject: "Forget password for ME _ CHAT Account",
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
                         <p>we are recieved request for forget password <br />  if you create request to update / forget your password <br /> <h1>${otp}</h1> </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #4338ca; color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; padding: 20px;">
                            <p style="margin: 0; font-size: 14px;">&copy; ${new Date().getFullYear()} ME CHAT. All rights reserved.</p>
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
