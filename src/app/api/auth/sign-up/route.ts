import { encrypt } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import User from "@/models/user";
import { signUpFormSchema } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { name, email, password } = await request.json();

        const parse = signUpFormSchema.safeParse({ name, email, password });

        if (!parse.success) {
            return NextResponse.json({ error: parse.error.flatten().fieldErrors }, { status: 400 })
        }

        const isAlreadyExist = await User.findOne({ email });

        if (isAlreadyExist) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }

        const user = await User.create({
            name,
            email,
            password
        });
        
        const token = encrypt(user._id.toString());
     
        return NextResponse.json({ message: "User created successfully", token }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}