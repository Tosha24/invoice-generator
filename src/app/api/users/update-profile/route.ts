import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { companyName, email, contact, address, city, state} = reqBody

        //check if user already exists
        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({error: "No User exists"}, {status: 400})
        }

        //create new user
        const updateUser = await user.updateOne({
            companyName, 
            contact,
            address,
            city,
            state,
        });

        console.log("data was updated");

        return NextResponse.json({
            message: 'User updated Successfully',
            success: true,
            updateUser
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
