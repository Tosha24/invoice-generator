import React from 'react';

interface Props {
  onClick: (invoice_id: any) => void;
  invoice: any;
  index: any;
}

const AllInvoices = ({onClick, invoice, index} : Props) => {
  return (
    <div className='flex flex-row border border-gray-300 p-3 justify-between rounded-lg flex-wrap cursor-pointer hover:bg-fuchsia-50' onClick={onClick}>
        <div>{index + 1}</div>
        <div className='w-52'>{invoice.customerName}</div>
        <div className='w-24'>{invoice.issueDate}</div>
        <div className='w-24'>{invoice.dueDate}</div>
        <div className='w-36'>{invoice.currency} {invoice.totalAmount.toFixed(2)}</div>
        <div className='w-18'>{invoice.status}</div>
    </div>
  )
}

export default AllInvoices