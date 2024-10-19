import { connect } from "@/app/lib/db/db";
import { NextResponse } from "next/server";

import Room from "@/app/lib/modals/one_to_one/room";
import User from "@/app/lib/modals/user_modal";

export const POST = async (req) => {

    await connect();

  try {

    const reqbody = await req.json();
    const { member, room } = reqbody;


  } catch (error) {
    
    return NextResponse.json({
      message: error.message,
      success: true,
    });
  
}
};
