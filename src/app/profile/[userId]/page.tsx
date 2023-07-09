"use client";

import InvoiceForm from "@/components/invoice/InvoiceForm";

export default function UserProfile({params} : any) {
    return (
        <div>
            <div className='mx-10 md:mx-24'>
                <InvoiceForm/>
            </div>
        </div>
    )
}