import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { DateTime } from "luxon";

export const GET = async (req) => {
  try {
    const token = req.cookies.get("mechat_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Token Required" }, { status: 401 });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log("error token verification failed", error?.message);
      return NextResponse.json(
        {
          message: error?.message,
        },
        { status: 401 }
      );
    }

    const currentTime = DateTime.now().toMillis() / 1000;

    if (decoded.exp && decoded.exp <= currentTime) {
      return NextResponse.json({ message: "session expired" }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "data fetch",
        token: decoded,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error for jwt", error?.message);
    return NextResponse.json(
      {
        message: error?.message,
      },
      { status: 200 }
    );
  }
};
