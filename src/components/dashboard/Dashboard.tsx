"use client";

import React from 'react'
import InvoiceTotal from './InvoiceTotal'
import AllInvoices from './AllInvoices'
import { useParams, useRouter } from 'next/navigation'
import Loading from '../Loading';
import Link from 'next/link';

interface Props {
  user: any;
}

const Dashboard = ({user}: Props) => {
  const router = useRouter();
  const params = useParams();

  const openInvoice = (invoice_id : String) => {
    Loading;
    router.push(`/profile/${params.userId}/${invoice_id}`);
  }

  return (
    <>
        <div className='h-full'>
            <div className='p-4 flex flex-row justify-around items-center'>
              <div> {" "} </div>
                <InvoiceTotal total={user.data.invoices.length}/>
                <div className='border w-32 h-12 text-lg font-bold cursor-pointer border-primaryColor tracking-wide font-bodyFont duration-300 items-center flex justify-center'>
                  <Link href={`/profile/${params.userId}/add-invoice`} className='no-underline text-primaryColor'>Create New</Link>
                </div>
            </div>
            <div className='p-5 flex flex-col gap-3'>
                <div className='flex flex-row items-start justify-between border-b-2 border-gray-600 mb-3 font-bold'>
                  <div className='w-1'>No.</div>
                  <div className='w-52'>Client Name</div>
                  <div className='w-24'>Issue Date</div>
                  <div className='w-24'>Due Date</div>
                  <div className='w-36'>Amount</div>
                  <div className='w-18'>Status</div>
                </div>
                {
                  user.data.invoices.length !== 0 ?
                  user.data.invoices.map((invoice: any, index: any) => {
                    console.log(invoice);
                    return (
                      <AllInvoices key={invoice._id} invoice={invoice} onClick={() => openInvoice(invoice._id)} index={index}/>
                    )
                  }) : (
                    <div className='flex justify-center text-xl'>
                      No Invoices Found!
                    </div>
                  )
                }
            </div>
        </div>
    </>
  )
}

export default Dashboard;