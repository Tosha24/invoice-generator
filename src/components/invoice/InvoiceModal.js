import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import { BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { format } from "date-fns";
import { RiSave3Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";

class InvoiceModal extends React.Component {
  constructor(props) {
    super(props);
  }
  GenerateInvoice = () => {
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792],
      });
      pdf.internal.scaleFactor = 1;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${this.props.info.billTo}-invoice.pdf`);
    });
  };

  render() {
    const user = this.props.user;

    const formattedDate = format(
      new Date(this.props.info.dateOfIssue),
      "dd/MM/yyyy"
    );
    return (
      <div className="bg-white w-[80%] min-h-[40%] items-center justify-center">
        <div id="invoiceCapture">
          <div>
            <div className="flex flex-row justify-between items-start w-100 px-4 bg-gray-400">
              <div className="w-100">
                <h4 className="fw-bold my-2 text-[50px] text-black">
                  {" "}
                  {user.data.companyName}
                </h4>
                <div className='flex flex-row gap-10'>
                  <h6 className="fw-bold text-secondary text-black">
                    Invoice : {this.props.info.invoiceNumber || ""}
                  </h6>
                  <h6 className='fw-bold text-secondary text-black'>Date Of Issue:&nbsp;{formattedDate || ""}</h6>
                </div>
              </div>
              <div className="text-end p-4">
                <h6 className="fw-bold mt-1 mb-2 text-black">
                  Amount&nbsp;Due:
                </h6>
                <h5 className="fw-bold text-secondary text-black text-[28px] mt-2">
                  {" "}
                  {this.props.currency}&nbsp;{this.props.total}
                </h5>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4 flex flex-row">
                <div className="flex flex-col cols-md-4 w-full">
                  <div className="fw-bold">Billed to:</div>
                  <div className='font-medium text-lg'>{this.props.info.billTo || ""}</div>
                  <div>{this.props.info.billToAddress || ""},</div>
                  <div>{this.props.info.billToCity || ""},</div>
                  <div>{this.props.info.billToState || ""}.</div>
                  <div className='italic underline'>{this.props.info.billToEmail || ""}</div>
                </div>
                <div className="flex flex-col cols-md-4 w-full">
                  <div className="fw-bold">Billed From:</div>
                  <div className='font-medium text-lg'>{user.data.companyName || ""}</div>
                  <div>{user.data.address || ""},</div>
                  <div>{user.data.city || ""},</div>
                  <div>{user.data.state || ""}.</div>
                  <div className='italic underline'>{user.data.email || ""}</div>
                </div> 
              </div>
              <table className="mb-0 w-full border border-collapse">
                <thead>
                  <tr className='border-b-2 '>
                    <th>No.</th>
                    <th className="border-l-2 border-r-2 text-justify p-2">DESCRIPTION</th>
                    <th className="text-center p-2">QTY</th>
                    <th className="border-l-2 text-center p-2">PRICE</th>
                    <th className="border-l-2 text-center p-2">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.items.map((item, i) => {
                    return (
                      <tr id={i} key={i} style={{ height: "35px" }} className="border-b-2">
                        <td style={{ width: "30px" }} className=" text-center">1</td>
                        <td className='break-all border-l-2 border-r-2 pl-2 pr-4'>
                          <span className='font-bold'>{item.name}</span> <br/> <span className='text-sm'>{item.description}</span>
                        </td>
                        <td style={{ width: "70px" }} className=" text-center">{item.quantity}</td>
                        <td className=" border-l-2 text-center" style={{ width: "100px" }}>
                          {this.props.currency} {item.price}
                        </td>
                        <td className=" border-l-2 text-center" style={{ width: "100px" }}>
                          {this.props.currency} {item.price * item.quantity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      SUBTOTAL
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {this.props.currency} {this.props.subTotal}
                    </td>
                  </tr>
                  {this.props.taxAmmount != 0.0 && (
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{ width: "100px" }}>
                        TAX
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {this.props.currency} {this.props.taxAmmount}
                      </td>
                    </tr>
                  )}
                  {this.props.discountAmmount != 0.0 && (
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{ width: "100px" }}>
                        DISCOUNT
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {this.props.currency} {this.props.discountAmmount}
                      </td>
                    </tr>
                  )}
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      TOTAL
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {this.props.currency} {this.props.total}
                    </td>
                  </tr>
                </tbody>
              </table>
              {this.props.info.notes && (
                <div className="bg-light py-3 px-4 mt-4 rounded">
                  Note:&nbsp;{this.props.info.notes}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pb-4 px-4 mt-6">
            <div className="flex flex-row items-center justify-center gap-3">
              <button
                className="flex max-w-fit mt-3 mt-md-0 bg-primaryColor items-center px-4 p-2 rounded-lg text-white hover:-translate-y-2 duration-300"
                onClick={this.props.closeModal}
              >
                <FaPencilAlt className="mr-2 mt-[-3px]" />
                Edit Invoice
              </button>
              <button
                className="flex max-w-fit mt-3 mt-md-0 bg-primaryColor items-center px-4 p-2 rounded-lg text-white hover:-translate-y-2 duration-300"
                onClick={this.GenerateInvoice}
              >
                <BiCloudDownload className="mr-2 mt-[-3px]" />
                Download Copy
              </button>
              <button
                className="flex max-w-fit mt-3 mt-md-0 bg-primaryColor items-center px-4 p-2 rounded-lg text-white hover:-translate-y-2 duration-300"
              >
                <RiSave3Fill className="mr-2 mt-[-3px]" />
                Save Invoice
              </button>
            </div>
        </div>
        <hr className="mt-4 mb-3" />
      </div>
    );
  }
}

export default InvoiceModal;
