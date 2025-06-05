import Address from "@/models/address";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const { userId } = data
        const addresses = await Address.find({ userId, saveAddress: true })
        if (!addresses) {
            throw new Error("saved Addresses not found")
        }
        return NextResponse.json({ message: "Address found", addresses }, { status: 200 });
    } catch (error) {
        console.log(error,"error");
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}