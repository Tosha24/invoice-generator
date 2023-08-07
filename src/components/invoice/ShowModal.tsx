import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import { BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { format } from "date-fns";
import { RiSave3Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import Loading from "../Loading";
import axios from "axios";
import { toDate } from "date-fns/esm";
import { toast } from "react-hot-toast";

interface Props {
  closeModal: () => void;
  localUser: any;
  items: any;
  user: any;
}

const ShowModal = ({
  closeModal,
  localUser,
  items,
  user,
}: Props) => {
  const invoiceDocument = document.querySelector("#invoiceCapture");

  const GenerateInvoice = () => {
    html2canvas(invoiceDocument as HTMLElement)
      .then((canvas) => {
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
        pdf.save(`${localUser.billTo}-invoice.pdf`);
      })
      .then(() => {
        // localUser.closeModal();
        // window.location.reload();
      });
  };

  const SaveInvoice = async () => {
    try {
      const response = await axios.post("/api/users/invoice", localUser);
      console.log(response);
      toast.success("Invoice Saved Successfully");
    //   localUser.closeModal();
    //   window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error while saving invoice!! Please try again later.");
    }
  };

  const formattedDate = format(new Date(localUser.dateOfIssue), "dd/MM/yyyy");

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
              <div className="flex flex-row gap-10">
                <h6 className="fw-bold text-secondary text-black">
                  Invoice : {localUser.invoiceNumber || ""}
                </h6>
                <h6 className="fw-bold text-secondary text-black">
                  Due Date:&nbsp;{formattedDate || ""}
                </h6>
              </div>
            </div>
            <div className="text-end p-4">
              <h6 className="fw-bold mt-1 mb-2 text-black">Amount&nbsp;Due:</h6>
              <h5 className="fw-bold text-secondary text-black text-[28px] mt-2">
                {" "}
                {localUser.currency}&nbsp;{localUser.total}
              </h5>
            </div>
          </div>
          <div className="p-4">
            <div className="mb-4 flex flex-row">
              <div className="flex flex-col cols-md-4 w-full">
                <div className="fw-bold">Billed to:</div>
                <div className="font-medium text-lg">
                  {localUser.billTo || ""}
                </div>
                <div>{localUser.billToAddress || ""},</div>
                <div>{localUser.billToCity || ""},</div>
                <div>{localUser.billToState || ""}.</div>
                <div className="flex flex-row mt-1">
                  <span className="font-medium">Email</span>:&nbsp;
                  <span>{localUser.billToEmail || ""}</span>
                </div>
                <div className="flex flex-row">
                  <span className="font-medium">Contact</span>:&nbsp;
                  <span>{localUser.billToContact || ""}</span>
                </div>
              </div>
              <div className="flex flex-col cols-md-4 w-full">
                <div className="fw-bold">Billed From:</div>
                <div className="font-medium text-lg">
                  {user.data.companyName || ""}
                </div>
                <div>{user.data.address || ""},</div>
                <div>{user.data.city || ""},</div>
                <div>{user.data.state || ""}.</div>
                <div className="flex flex-row mt-1">
                  <span className="font-medium">Email</span>:&nbsp;
                  <span> {user.data.email || ""}</span>
                </div>
                <div className="flex flex-row">
                  <span className="font-medium">Contact</span>:&nbsp;
                  <span> {user.data.contact || ""}</span>
                </div>
              </div>
            </div>
            <table className="mb-0 w-full border border-collapse">
              <thead>
                <tr className="border-b-2 ">
                  <th>No.</th>
                  <th className="border-l-2 border-r-2 text-justify p-2">
                    DESCRIPTION
                  </th>
                  <th className="text-center p-2">QTY</th>
                  <th className="border-l-2 text-center p-2">PRICE</th>
                  <th className="border-l-2 text-center p-2">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: any, i: any) => {
                  return (
                    <tr
                      id={i}
                      key={i}
                      style={{ height: "35px" }}
                      className="border-b-2"
                    >
                      <td style={{ width: "30px" }} className=" text-center">
                        {i + 1}
                      </td>
                      <td className="break-all border-l-2 border-r-2 pl-2 pr-4 pb-2">
                        <span className="font-bold">{item.name}</span> <br />{" "}
                        <span className="text-sm">{item.description}</span>
                      </td>
                      <td style={{ width: "70px" }} className=" text-center">
                        {item.quantity}
                      </td>
                      <td
                        className=" border-l-2 text-center"
                        style={{ width: "100px" }}
                      >
                        {localUser.currency} {item.price}
                      </td>
                      <td
                        className=" border-l-2 text-center"
                        style={{ width: "100px" }}
                      >
                        {localUser.currency} {item.price * item.quantity}
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
                  <td className="fw-bold pr-2" style={{ width: "100px" }}>
                    SUBTOTAL
                  </td>
                  <td className="text-end min-w-fit">
                    {localUser.currency} {localUser.subTotal}
                  </td>
                </tr>
                {localUser.taxAmount != "0.00" && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold pr-2" style={{ width: "100px" }}>
                      TAX
                    </td>
                    <td className="text-end min-w-fit">
                      ({localUser.taxRate}%)&nbsp;{localUser.currency}&nbsp;
                      {localUser.taxAmount}
                    </td>
                  </tr>
                )}
                {localUser.discountAmount != "0.00" && (
                  <tr className="text-end">
                    <td></td>
                    <td
                      className="fw-bold border-b-2 pb-2 pr-2"
                      style={{ width: "100px" }}
                    >
                      DISCOUNT
                    </td>
                    <td className="text-end border-b-2 pb-2 min-w-fit">
                      ({localUser.discountRate}%)&nbsp;{localUser.currency}
                      &nbsp;{localUser.discountAmount}
                    </td>
                  </tr>
                )}
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold pr-2" style={{ width: "100px" }}>
                    TOTAL
                  </td>
                  <td className="text-end" style={{ width: "200px" }}>
                    {localUser.currency} {localUser.total}
                  </td>
                </tr>
              </tbody>
            </table>
            {localUser.notes && (
              <div className="bg-light py-3 px-4 mt-4 rounded">
                Note:&nbsp;{localUser.notes}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pb-4 px-4 mt-6">
        <div className="flex flex-row items-center justify-center gap-3">
          <button
            className="flex max-w-fit mt-3 mt-md-0 bg-primaryColor items-center px-4 p-2 rounded-lg text-white hover:-translate-y-2 duration-300"
            onClick={() => closeModal}
          >
            <FaPencilAlt className="mr-2 mt-[-3px]" />
            Edit Invoice
          </button>
          <button
            className="flex max-w-fit mt-3 mt-md-0 bg-primaryColor items-center px-4 p-2 rounded-lg text-white hover:-translate-y-2 duration-300"
            onClick={() => GenerateInvoice}
          >
            <BiCloudDownload className="mr-2 mt-[-3px]" />
            Download Copy
          </button>
          <button
            className="flex max-w-fit mt-3 mt-md-0 bg-primaryColor items-center px-4 p-2 rounded-lg text-white hover:-translate-y-2 duration-300"
            onClick={() => SaveInvoice}
          >
            <RiSave3Fill className="mr-2 mt-[-3px]" />
            Save Invoice
          </button>
        </div>
      </div>
      <hr className="mt-4 mb-3" />
    </div>
  );
};

export default ShowModal;