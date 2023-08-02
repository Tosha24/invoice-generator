import React from 'react'
import InvoiceTotal from './InvoiceTotal'
import AllInvoices from './AllInvoices'
import { useParams, useRouter } from 'next/navigation'

const Dashboard = () => {
  const router = useRouter();
  const params = useParams();

  const openInvoice = () => {
    router.push(`/profile/${params.userId}/1`);
  }

  return (
    <>
        <div className='h-full'>
            <div className='p-4'>
                <InvoiceTotal/>
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