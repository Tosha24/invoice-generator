import React, { useState, useEffect } from "react";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import moment from "moment";

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
}

interface InvoiceData {
  isOpen: boolean;
  currency: string;
  currentDate: string;
  invoiceNumber: number;
  dateOfIssue: string;
  billTo: string;
  billToEmail: string;
  billToAddress: string;
  billFrom: string;
  billFromEmail: string;
  billFromAddress: string;
  notes: string;
  total: string;
  subTotal: string;
  taxRate: string;
  taxAmmount: string;
  discountRate: string;
  discountAmmount: string;
  items: Item[];
}

const initialItem: Item = {
  id: 0,
  name: "",
  description: "",
  price: "0.00",
  quantity: 1,
};

const initialInvoiceData: InvoiceData = {
  isOpen: false,
  currency: "₹",
  currentDate: "",
  invoiceNumber: 1,
  dateOfIssue: "",
  billTo: "",
  billToEmail: "",
  billToAddress: "",
  billFrom: "",
  billFromEmail: "",
  billFromAddress: "",
  notes: "",
  total: "0.00",
  subTotal: "0.00",
  taxRate: "",
  taxAmmount: "0.00",
  discountRate: "",
  discountAmmount: "0.00",
  items: [initialItem],
};

const InvoiceForm = () => {
  const [invoicedata, setInvoicedata] =
    useState<InvoiceData>(initialInvoiceData);

  useEffect(() => {
    handleCalculateTotal();
  });

  const handleRowDel = (items: any) => {
    var index = invoicedata.items.indexOf(items);
    invoicedata.items.splice(index, 1);
    setInvoicedata({
      ...invoicedata,
      items: invoicedata.items,
    });
    handleCalculateTotal();
  };

  const handleAddEvent = () => {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var newItem = {
      id: id,
      name: "",
      description: "",
      price: "0.00",
      quantity: 1,
    };

    setInvoicedata((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        {
          ...initialItem,
          id: prevState.items.length,
        },
      ],
    }));
  };

  const handleCalculateTotal = () => {
    var items = invoicedata.items;
    var subTotal: number = 0;

    items.forEach((item) => {
      var price = parseFloat(item.price);
      subTotal = subTotal + price * item.quantity;
    });

    setInvoicedata({
      ...invoicedata,
      subTotal: subTotal.toFixed(2),
      taxAmmount: (subTotal * (parseFloat(invoicedata.taxRate) / 100)).toFixed(
        2
      ),
      discountAmmount: (
        subTotal *
        (parseFloat(invoicedata.discountRate) / 100)
      ).toFixed(2),
      total: (
        subTotal +
        subTotal * (parseFloat(invoicedata.taxRate) / 100) -
        subTotal * (parseFloat(invoicedata.discountRate) / 100)
      ).toFixed(2),
    });
  };

  const onItemizedItemEdit = (evt : any) => {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };

    var items = invoicedata.items.slice();

    var newItems = items.map(function (items : any) {
      for (var key in items) {
        if (key == item.name && items.id == item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    setInvoicedata((prevState) => ({
      ...prevState,
      items: newItems,
    }));
    handleCalculateTotal();
  };

  const editField = (event: any) => {
    setInvoicedata((prevData: any) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
    handleCalculateTotal();
  };

  const onCurrencyChange = (selectedOption: any) => {
    setInvoicedata((prevData) => ({
      ...prevData,
      currency: selectedOption.value,
    }));
  };

  const openModal = (event: any) => {
    event.preventDefault();
    handleCalculateTotal();
    setInvoicedata((prevData) => ({
      ...prevData,
      isOpen: true,
    }));
  };

  const closeModal = (event: any) => {
    setInvoicedata((prevData) => ({
      ...prevData,
      isOpen: false,
    }));
  };

  return (
    <>
      <div>
        <form onSubmit={openModal}>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col col-md-8 col-lg-9">
              <div className="border border-gray-200 rounded-lg p-4 p-xl-5 my-3 my-xl-4">
                <div className="flex flex-row items-start justify-between mb-3">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <span className="font-bold">Current Date: </span>
                        <span>{moment().format("DD-MM-YYYY")}</span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <span className="font-bold block mr-2">Due Date: </span>
                      <input
                        type="date"
                        value={invoicedata.dateOfIssue}
                        name="dateOfIssue"
                        onChange={(event) => editField(event)}
                        className="max-w-[150px] pl-4 p-[6px] rounded-lg bg-borderColor"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-row items-center">
                    <span className="font-bold me-2">Invoice Number: </span>
                    <input
                      type="number"
                      className="max-w-[70px] bg-borderColor p-[6px] rounded-lg pl-3"
                      value={invoicedata.invoiceNumber}
                      name="invoiceNumber"
                      onChange={(event) => editField(event)}
                      min="1"
                      required
                    />
                  </div>
                </div>
                <hr className="my-4" />
                <div className="mb-5 flex flex-row gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label className="font-bold">Bill to:</label>
                    <input
                      placeholder="Who is this invoice to?"
                      className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-borderColor rounded-lg"
                      value={invoicedata.billTo}
                      type="text"
                      name="billTo"
                      onChange={(event) => editField(event)}
                      autoComplete="name"
                      required
                    />
                    <input
                      placeholder="Email address"
                      className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-borderColor rounded-lg"
                      value={invoicedata.billToEmail}
                      type="email"
                      name="billToEmail"
                      onChange={(event) => editField(event)}
                      autoComplete="email"
                      required
                    />
                    <input
                      placeholder="Billing address"
                      className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-borderColor rounded-lg"
                      value={invoicedata.billToAddress}
                      type="text"
                      name="billToAddress"
                      onChange={(event) => editField(event)}
                      autoComplete="address"
                      required
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="font-bold">Bill from:</label>
                    <input
                      placeholder="Who is this invoice from?"
                      className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-borderColor rounded-lg"
                      value={invoicedata.billFrom}
                      type="text"
                      name="billFrom"
                      onChange={(event) => editField(event)}
                      autoComplete="name"
                      required
                    />
                    <input
                      placeholder="Email address"
                      className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-borderColor rounded-lg"
                      value={invoicedata.billFromEmail}
                      type="email"
                      name="billFromEmail"
                      onChange={(event) => editField(event)}
                      autoComplete="email"
                      required
                    />
                    <input
                      placeholder="Billing address"
                      className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-borderColor rounded-lg"
                      value={invoicedata.billFromAddress}
                      type="text"
                      name="billFromAddress"
                      onChange={(event) => editField(event)}
                      autoComplete="address"
                      required
                    />
                  </div>
                </div>
                <InvoiceItem
                  onItemizedItemEdit={onItemizedItemEdit}
                  onRowAdd={handleAddEvent}
                  onRowDel={handleRowDel}
                  currency={invoicedata.currency}
                  items={invoicedata.items}
                />
                <div className="flex flex-end mt-4 justify-content-end">
                  <div className="col-lg-6">
                    <div className="flex flex-row items-start justify-between">
                      <span className="font-bold">Subtotal: </span>
                      <span>
                        {invoicedata.currency}
                        {invoicedata.subTotal}
                      </span>
                    </div>
                    <div className="flex flex-row items-start justify-between mt-2">
                      <span className="font-bold">Discount:</span>
                      <span>
                        <span>({invoicedata.discountRate || 0}%)</span>
                        {invoicedata.currency}
                        {invoicedata.discountAmmount || 0}
                      </span>
                    </div>
                    <div className="flex flex-row items-start justify-between mt-2">
                      <span className="font-bold">Tax:</span>
                      <span>
                        <span>({invoicedata.taxRate || 0}%)</span>
                        {invoicedata.currency}
                        {invoicedata.taxAmmount || 0}
                      </span>
                    </div>
                    <hr />
                    <div className="flex font-xl flex-row items-start justify-between">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold">
                        {invoicedata.currency}
                        {invoicedata.total || 0}
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <label className="font-bold">Notes:</label>
                <textarea
                  placeholder="Thanks for your business!"
                  name="notes"
                  value={invoicedata.notes}
                  onChange={(event) => editField(event)}
                  className="my-2 block w-full placeholder:text-gray-600 bg-borderColor rounded-sm p-2"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex flex-col col-md-4 col-lg-3">
              <div className="sticky top-0 pt-md-3 pt-xl-4">
                <button
                  type="submit"
                  className="block w-full bg-primaryColor hover:bg-hoverColor text-white tracking-wider py-2 rounded-lg"
                >
                  Review Invoice
                </button>
                <div className="mt-3 mb-3 w-full flex flex-col group">
                  <label className="font-bold">Currency: </label>
                  <select
                    onChange={(event) =>
                      onCurrencyChange({ currency: event.target.value })
                    }
                    className="bg-borderColor p-2 rounded-lg items-center my-1 border border-borderColor"
                    aria-label="Change Currency"
                  >
                    <option value="₹">INR (Indian Rupees)</option>
                    <option value="$">USD (United States Dollar)</option>
                    <option value="£">GBP (British Pound Sterling)</option>
                    <option value="¥">JPY (Japanese Yen)</option>
                    <option value="₿">BTC (Bitcoin)</option>
                  </select>
                </div>
                <div className="my-3">
                  <label className="font-bold">Tax rate:</label>
                  <div className="my-1 flex flex-nowrap group">
                    <input
                      name="taxRate"
                      type="number"
                      value={parseFloat(invoicedata.taxRate)}
                      onChange={(event) => editField(event)}
                      className="w-[90%] p-2 bg-white border border-r-0 border-borderColor rounded-l-md"
                      placeholder="0.0"
                      min="0.00"
                      step="0.01"
                      max="100.00"
                    />
                    <span className="bg-gray-50 w-[11%] border rounded-r-md border-borderColor p-1 font-bold text-gray-500 flex items-center justify-center">
                      %
                    </span>
                  </div>
                </div>
                <div className="my-3">
                  <label className="font-bold">Discount rate:</label>
                  <div className="my-1 flex flex-nowrap group">
                    <input
                      className="w-[90%] p-2 bg-white border border-r-0 border-borderColor rounded-l-md"
                      type="number"
                      name="discountRate"
                      value={parseFloat(invoicedata.discountRate)}
                      onChange={(event) => editField(event)}
                      placeholder="0.0"
                      min="0.00"
                      step="0.01"
                      max="100.00"
                    />
                    <span className="bg-gray-50 w-[11%] border rounded-r-md border-borderColor p-1 font-bold text-secondary flex items-center justify-center">
                      %
                    </span>
                  </div>
                </div>
                <div className="my-3">
                  <button className="block w-full bg-red-500 hover:bg-hoverColor text-white tracking-wider py-2 rounded-lg">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {invoicedata.isOpen && (
        <div
          className="w-full h-full bg-[#0000007F] z-10 top-0 right-0 left-0 bottom-0 fixed items-center justify-center flex"
          onClick={closeModal}
        >
          <InvoiceModal
            showModal={invoicedata.isOpen}
            closeModal={closeModal}
            info={invoicedata}
            items={invoicedata.items}
            currency={invoicedata.currency}
            subTotal={invoicedata.subTotal}
            taxAmmount={invoicedata.taxAmmount}
            discountAmmount={invoicedata.discountAmmount}
            total={invoicedata.total}
          />
        </div>
      )}
    </>
  );
};

export default InvoiceForm;
