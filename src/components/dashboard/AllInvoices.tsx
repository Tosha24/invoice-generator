import React from 'react';

interface Props {
  onClick: () => void;
}

const AllInvoices = ({onClick} : Props) => {
  return (
    <div className='flex flex-row border border-gray-300 p-3 justify-between rounded-lg flex-wrap cursor-pointer hover:bg-fuchsia-50' onClick={onClick}>
        <div>1</div>
        <div>Moon Industries</div>
        <div>20-07-2023</div>
        <div>29-07-2023</div>
        <div>$ 2342</div>
        <div>pending</div>
    </div>
  )
}

export default AllInvoices