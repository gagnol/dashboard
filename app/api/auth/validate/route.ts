import dbConnect from "@/lib/db-connect";
import User from "@/lib/user-model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { token } = await request.json();
    await dbConnect();
    
    const existingUser = await User.findOne({ token: token });

    if (existingUser && isTokenValid(existingUser.tokenExpiration)) {
        return NextResponse.json({
            status: 200,
        });
    } else {
        return NextResponse.json({
            message: "Invalid Token",
        }, {
            status: 400,
        });
    }
}

function isTokenValid(expirationTimestamp: number): boolean {
    // Compare the expiration timestamp with the current time
    const currentTime = Date.now();
    return expirationTimestamp > currentTime;
}
