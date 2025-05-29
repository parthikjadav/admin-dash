"use server"

import { decrypt } from "@/lib/auth";
import api from "@/lib/axios";
import connectDB from "@/lib/mongoose";
import User from "@/models/user";
import { signInFormSchemaType, signUpFormSchemaType } from "@/validation";
import { cookies } from "next/headers";

export async function signIn(data: signInFormSchemaType) {
    try {
        const response = await api.post('/auth/sign-in', data);
        const token = response.data.token;
        console.log(response, "res");

        if (!token) return false;
        (await cookies()).set('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        })
        return true;
    } catch (error: any) {
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
            console.log('Headers:', error.response.headers);
        } else if (error.request) {
            console.log('Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
    }
}

export async function signUp(data: signUpFormSchemaType) {
    try {
        const res = await api.post('/auth/sign-up', data);
        const token = res.data.token;
        if (!token) return false;
        (await cookies()).set('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        })
        return true;
    } catch (error: any) {
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
            console.log('Headers:', error.response.headers);
        } else if (error.request) {
            console.log('Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
    }
}

export async function signOut() {
    (await cookies()).delete("token")
}

export async function getUser() {
    try {
        await connectDB()
        const token = (await cookies()).get("token")
        if(!token) return null

        let data: any = decrypt(token.value)
        if(!data) return null

        let user = await User.findById(data.userId).select("-password")
        user = JSON.parse(JSON.stringify(user))
        return user
    } catch (error) {
        console.log("error get user : ", error);
        return false
    }
}
