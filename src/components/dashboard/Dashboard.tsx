import React from 'react'
import InvoiceTotal from './InvoiceTotal'
import AllInvoices from './AllInvoices'
import { useParams, useRouter } from 'next/navigation'
import Loading from '../Loading';
import Link from 'next/link';

const Dashboard = () => {
  const router = useRouter();
  const params = useParams();

  const openInvoice = () => {
    Loading;
    router.push(`/profile/${params.userId}/1`);
  }

  return (
    <>
        <div className='h-full'>
            <div className='p-4 flex flex-row justify-around items-center'>
              <div> {" "} </div>
                <InvoiceTotal/>
                <div className='border w-32 h-12 text-lg font-bold cursor-pointer border-primaryColor tracking-wide font-bodyFont duration-300 items-center flex justify-center'>
                  <Link href={`/profile/${params.userId}/add-invoice`} className='no-underline text-primaryColor'>Create New</Link>
                </div>
            </div>
            <div className='p-5 flex flex-col gap-3'>
                <div className='flex flex-row items-start justify-between border-b-2 border-gray-600 mb-3 font-bold'>
                  <div>No.</div>
                  <div>Client Name</div>
                  <div>Issue Date</div>
                  <div>Due Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                <AllInvoices onClick={openInvoice}/>
            </div>
        </div>
    </>
  )
}

export default Dashboard;