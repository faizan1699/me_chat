import User from "@/app/lib/modals/user_modal";
import { NextResponse } from "next/server";
import { connect } from "@/app/lib/db/db";

export const POST = async (req) => {
  await connect();
  try {
  } catch (error) {
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
};
