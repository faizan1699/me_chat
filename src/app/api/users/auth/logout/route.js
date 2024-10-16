import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const response = NextResponse.json({
      message: "logout successfully",
    });
    response.cookies.delete("mechat_token");

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: error?.message,
        success: false,
      },
      { status: 500, statusText: "user not logout" }
    );
  }
};
