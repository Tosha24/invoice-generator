import React from "react";

interface Props {
  total: Number;
  paid?: Number;
}

const InvoiceTotal = ({total, paid=0} : Props) => {
  return (
    <div className="flex flex-row gap-6 rounded-md text-primaryColor">
      <div className="font-extrabold p-1 flex flex-row gap-2 justify-center items-center rounded-md border-2 border-primaryColor">
        <div className="text-md">Total Invoices: </div>
        <div className="text-lg">{total.toFixed(0)}</div>
      </div>
      <div className="font-extrabold p-1 flex flex-row gap-2 justify-center items-center rounded-md border-2 border-primaryColor">
        <div className="text-md">Paid Invoices:</div>
        <div className="text-lg">{paid.toFixed(0)}</div>
      </div>
      <div className="p-2 font-extrabold flex flex-row gap-1 items-center justify-center rounded-md border-2 border-primaryColor">
        <div className="text-md ">Unpaid Invoices:</div>
        <div className="text-lg ">{parseInt(total.toFixed(0)) - parseInt(paid.toFixed(0))}</div>
      </div>
    </div>
  );
};

export default InvoiceTotal;