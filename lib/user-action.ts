"use server"
import UserModel from './user-model'
import dbConnect from './db-connect'
import { z } from 'zod'
import bcryptjs from 'bcryptjs';
import { revalidatePath } from 'next/cache';


export async function createUser(prevState: any, formData: FormData) {
    const schema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        cpassword: z.string().min(6),
    })
    const parse = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        cpassword: formData.get('cpassword'),
    })
    if (!parse.success) {
        console.log(parse.error)
        return { message: 'Form data is not valid' }
    }
    const data = parse.data
    try {
        await dbConnect();
        const existingUser = await UserModel.findOne({ email: data.email });
        if (existingUser) {
            return { message: 'User already exist' }
        }
        const hashedPassword = bcryptjs.hash(data.password, 10);

        const newUser = new UserModel({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            avatar: 'https://res.cloudinary.com/dps8xubee/image/upload/v1684105438/avatar/pmbgserj2nobgqn2auwr.png',
            isAdmin: false,
        });
        const user: any = await newUser.save();
        revalidatePath('/')

        return ({
            message: 'User created successfully!',
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (e) {
        return { message: 'Failed to register' }
    }
}
