import User from "@/models/User";
import { connectToDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST (Request: NextRequest){
    try {
        const {email, password} = await Request.json()
        if (!email || !password) {
            return NextResponse.json(
                {error: "Email and Password are required"},
                {status: 400}
            )
        }

        await connectToDatabase()
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            )
        }
        await User.create({
            email, password
        })

        return NextResponse.json(
            {message: "User registered Successfully"},
            {status: 400}
        )

    } catch (error) {
        console.error("Registration error", error)
        NextResponse.json(
            {error: "Regestration Failed"},
            {status: 400}
        )
    }
}