import { encrypt } from '@/lib/auth';
import connectDB from '@/lib/mongoose';
import User from '@/models/user';
import { signInFormSchema } from '@/validation';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const { email, password } = await request.json();
        const parse = signInFormSchema.safeParse({ email, password });

        if (!parse.success) {
            return NextResponse.json(parse.error, {
                status: 400,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, {
                status: 404,
            });
        }

        const isPasswordCorrect = user.password === password;
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: "Incorrect password" }, {
                status: 401,
            });
        }
    
        const token = encrypt(user._id.toString());
        
        return NextResponse.json({ message: "User authenticated", token }, {
            status: 200,
        })
    } catch (error) {
        console.log(error, "error api");

        return NextResponse.json(JSON.stringify({ message: "Something went wrong" }), {
            status: 500,
        })
    }
}