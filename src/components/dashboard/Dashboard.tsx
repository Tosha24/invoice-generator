import React from 'react'
import InvoiceTotal from './InvoiceTotal'
import AllInvoices from './AllInvoices'

const Dashboard = () => {
  return (
    <>
        <div className='h-full'>
            <div className='p-4'>
                <InvoiceTotal/>
            </div>
            <div className='p-5 border'>
                <AllInvoices/>
            </div>
        </div>
    </>
  )
}

export default Dashboard