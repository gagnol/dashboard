import dbConnect from "@/lib/db-connect"
import User from "@/lib/user-model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email, password, cpassword } = await request.json();
    if (password !== cpassword) {
      return NextResponse.json(
        { message: "Password must match" },
        { status: 400 }
      );
    }
    if (password < 6)
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );

    const userFound = await User.findOne({ email });

    if (userFound) {
      userFound.password = await User.updateOne({ email: email },
        { $set: { password: bcrypt.hashSync(password) } });
      return NextResponse.json(
        {
          message: "password update",
        },
        {
          status: 200,
        }
      );
    }


  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.error();
  }
}
