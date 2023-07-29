import React from "react";

const InvoiceTotal = () => {
  return (
    <div className="flex flex-row justify-center gap-5">
      <div className="border p-4 flex flex-col justify-center items-center rounded-3xl bg-lightColor">
        <span className="text-md font-extrabold">Total Invoices: </span>
        <span className="text-lg">100</span>
      </div>
      <div className="border p-4 flex flex-col justify-center items-center rounded-3xl bg-lightColor">
        <span className="text-md font-extrabold">Paid Invoices:</span>
        <span className="text-lg">50</span>
      </div>
      <div className="border p-4 flex flex-col items-center justify-center rounded-3xl bg-lightColor">
        <span className="text-md font-extrabold">Unpaid Invoices:</span>
        <span className="text-lg">50</span>
      </div>
    </div>
  );
};

export default InvoiceTotal;