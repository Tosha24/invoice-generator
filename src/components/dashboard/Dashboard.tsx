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
            <div className='p-4 flex flex-row justify-start items-center mx-4'>
              {/* <div> {" "} </div> */}
                <InvoiceTotal total={user.data.invoices.length}/>
                
            </div>
            <div className='px-[30px] py-3 flex flex-col gap-3 '>
                <div className='flex text-lg flex-row items-start justify-between border-b-2 text-white  bg-hoverColor py-2 px-2 mb-3 font-bold'>
                  <div className='w-1'>No.</div>
                  <div className='w-52'>Client Name</div>
                  <div className='w-24'>Issue Date</div>
                  <div className='w-24'>Due Date</div>
                  <div className='w-36 flex justify-end'>Amount</div>
                  <div className='w-18'>Status</div>
                </div>
                <div>
                  {
                    user.data.invoices.length !== 0 ?
                    user.data.invoices.map((invoice: any, index: any) => {
                      console.log(invoice);
                      return (
                        <>
                        <AllInvoices key={invoice._id} invoice={invoice} onClick={() => openInvoice(invoice._id)} index={index}/>
                        </>
                      )
                    }) : (
                      <div className='flex justify-center text-xl'>
                        No Invoices Found!
                      </div>
                    )
                  }
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard;