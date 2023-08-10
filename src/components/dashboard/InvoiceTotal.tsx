import React from "react";

interface Props {
  total: Number;
  paid?: Number;
}

const InvoiceTotal = ({total, paid=0} : Props) => {
  return (
    <div className="flex flex-row justify-center gap-5">
      <div className="border p-4 flex flex-col justify-center items-center rounded-3xl bg-lightColor">
        <span className="text-md font-extrabold">Total Invoices: </span>
        <span className="text-lg">{total.toFixed(0)}</span>
      </div>
      <div className="border p-4 flex flex-col justify-center items-center rounded-3xl bg-lightColor">
        <span className="text-md font-extrabold">Paid Invoices:</span>
        <span className="text-lg">{paid.toFixed(0)}</span>
      </div>
      <div className="border p-4 flex flex-col items-center justify-center rounded-3xl bg-lightColor">
        <span className="text-md font-extrabold">Unpaid Invoices:</span>
        <span className="text-lg">{parseInt(total.toFixed(0)) - parseInt(paid.toFixed(0))}</span>
      </div>
    </div>
  );
};

export default InvoiceTotal;