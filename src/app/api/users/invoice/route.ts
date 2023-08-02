import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, invoiceNumber, issueDate, dueDate, customerName, customerEmail, customerGstin, customerAddress, customerCity, customerState, customerContact, currency, taxRate, discountRate, totalAmount, status, items } = reqBody

        //check if user already exists
        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({error: "No user exists"}, {status: 400})
        }

        //create new invoice
        user.invoices.push({
            invoiceNumber,
            issueDate,
            dueDate,
            customerName,
            customerEmail,
            customerGstin,
            customerAddress,
            customerCity,
            customerState,
            customerContact,
            currency,
            taxRate,
            discountRate,
            totalAmount,
            status,
            items,
        })

        const savedInvoice = await user.save()

        return NextResponse.json({
            message: 'Invoice created successfully',
            success: true,
            savedInvoice
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}