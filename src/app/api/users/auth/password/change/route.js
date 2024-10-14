import User from "@/app/lib/modals/user_modal";
import { NextResponse } from "next/server";
import { connect } from "@/app/lib/db/db";

import { getUserdata } from "@/app/lib/jwt/jwt";

export const POST = async (req) => {
  connect();

  getUserdata();

  try {
    const reqbody = await req.json();
    const { password } = reqbody;

    const a = "s";
  } catch (error) {
    console.log("error changing password", error?.message);
  }
};
