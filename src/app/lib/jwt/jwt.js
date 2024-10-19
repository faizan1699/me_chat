import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { DateTime } from "luxon";

export const JWT_TOKEN = (req) => {
  try {
    const cookie = req.cookies.get("mechat_token");
    const token = cookie && typeof cookie === "object" ? cookie.value : cookie;

    if (!token) {
      return NextResponse.json({ message: "Token Required." }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { message: "Token verification failed", error: error.message },
        { status: 401 }
      );
    }

    const currentTime = DateTime.now().toMillis() / 1000;
    if (decoded.exp && decoded.exp <= currentTime) {
      return NextResponse.json({ message: "Session expired" }, { status: 401 });
    }

    return decoded; // Consistent return
  } catch (error) {
    console.error("Error decoding JWT:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
