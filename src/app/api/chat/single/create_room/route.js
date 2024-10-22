import { connect } from "@/app/lib/db/db";
import { NextResponse } from "next/server";
import { JWT_TOKEN } from "@/app/lib/jwt/jwt";

export const POST = async (req) => {
  try {
    await connect();

    const tokenData = JWT_TOKEN(req); // Call the JWT_TOKEN function
    console.log("User token data:", tokenData);

    if (!tokenData.email) {
      return NextResponse.json(
        {
          token: "token not found or invalid",
          success: false,
        },
        { status: 401 } // Unauthorized
      );
    }

    return NextResponse.json(
      {
        user: {
          username: tokenData.username,
          email: tokenData.email,
          id: tokenData.id,
        },
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error); 

    return NextResponse.json(
      {
        token: "token not found: " + error.message,
        success: false,
      },
      { status: 500 }
    );
  }
};
