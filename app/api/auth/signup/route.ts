import bcryptjs from 'bcryptjs';
import UserModel from '@/lib/user-model';
import dbConnect from '@/lib/db-connect';
import { NextRequest, NextResponse } from 'next/server';

interface CreateUserRequest {
  method: string;
  body: {
    name: string;
    email: string;
    password: string;
  };
}

interface CreateUserResponse {
  status: (code: number) => CreateUserResponseMethods;
}

interface CreateUserResponseMethods {
  json?: (data: Record<string, any>) => void;
  send: (data: Record<string, any>) => void;
}

async function handler(
  NextRequest: NextRequest & CreateUserRequest,
  NextResponse: NextResponse & CreateUserResponse
) {
  if (NextRequest.method !== 'POST') {
    NextResponse.status(405)?.send({ message: 'Method Not Allowed' });
    return;
  }

  const { name, email, password } = NextRequest.body;

  if (!name || !email || !email.includes('@') || !password || password.trim().length < 5) {
    NextResponse.status(400)?.json?.({
      message: 'Validation error',
    });
    return;
  }

  await dbConnect();

  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      NextResponse.status(422)?.json?.({ message: 'User already exists!' });
      return;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      avatar: 'https://res.cloudinary.com/dps8xubee/image/upload/v1684105438/avatar/pmbgserj2nobgqn2auwr.png',
      isAdmin: false,
    });

    const user: any = await newUser.save();

    NextResponse.status(201)?.json?.({
      message: 'User created successfully!',
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    NextResponse.status(500)?.json?.({ message: 'Internal Server Error' });
  }
}

export { handler as POST };
