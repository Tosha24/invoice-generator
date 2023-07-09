import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import { BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { format } from "date-fns";

function GenerateInvoice() {
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
    pdf.save("invoice-001.pdf");
  });
}

class InvoiceModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const formattedDate = format(
      new Date(this.props.info.dateOfIssue),
      "dd/MM/yyyy"
    );
    return (
      <div className="bg-white w-[80%] min-h-[40%] items-center justify-center">
        <div id="invoiceCapture">
          <div>
            <div className="flex flex-row justify-between items-start w-100 p-4 bg-gray-400">
              <div className="w-100">
                <h4 className="fw-bold my-2 text-[50px] text-black">
                  {" "}
                  {this.props.info.billFrom}
                </h4>
                <h6 className="fw-bold text-secondary mb-1 text-black">
                  Invoice : {this.props.info.invoiceNumber || ""}
                </h6>
              </div>
              <div className="text-end ms-4">
                <h6 className="fw-bold mt-1 mb-2 text-black">
                  Amount&nbsp;Due:
                </h6>
                <h5 className="fw-bold text-secondary text-black text-[28px] mt-2">
                  {" "}
                  {this.props.currency} {this.props.total}
                </h5>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4 flex flex-row items-center justify-between">
                <div className="flex flex-col cols-md-4">
                  <div className="fw-bold">Billed to:</div>
                  <div>{this.props.info.billTo || ""}</div>
                  <div>{this.props.info.billToAddress || ""}</div>
                  <div>{this.props.info.billToEmail || ""}</div>
                </div>
                <div className="flex flex-col cols-md-4">
                  <div className="fw-bold">Billed From:</div>
                  <div>{this.props.info.billFrom || ""}</div>
                  <div>{this.props.info.billFromAddress || ""}</div>
                  <div>{this.props.info.billFromEmail || ""}</div>
                </div>
                <div className="flex flex-col cols-md-4">
                  <div className="fw-bold mt-2 text-[16px]">Date Of Issue:</div>
                  <div>{formattedDate || ""}</div>
                </div>
              </div>
              <table className="mb-0 w-full">
                <thead>
                  <tr>
                    <th>QTY</th>
                    <th>DESCRIPTION</th>
                    <th className="text-end">PRICE</th>
                    <th className="text-end">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.items.map((item, i) => {
                    return (
                      <tr id={i} key={i} style={{ height: "35px" }}>
                        <td style={{ width: "70px" }}>{item.quantity}</td>
                        <td>
                          {item.name} - {item.description}
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {this.props.currency} {item.price}
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
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
                <div className="bg-light py-3 px-4 rounded">
                  {this.props.info.notes}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pb-4 px-4 mt-6">
          <div className="flex flex-row gap-3">
            <div className="flex flex-col cols-md-6 w-full">
              <button
                className="flex mx-auto max-w-fit mt-3 mt-md-0 bg-primaryColor items-center px-4 p-2 rounded-lg text-white"
                onClick={GenerateInvoice}
              >
                <BiCloudDownload className="mr-2 text-4xl mt-[-3px]" />
                Download Copy
              </button>
            </div>
          </div>
        </div>
        <hr className="mt-4 mb-3" />
      </div>
    );
  }
}

export default InvoiceModal;
