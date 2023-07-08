"use client";

import Login from "@/components/Login";
import Container from "react-bootstrap/Container";
import InvoiceForm from "@/components/invoice/InvoiceForm";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-x-hidden overflow-y-scroll m-0 p-0">
      <Login/>
      {/* <div>
        <Container>
          <InvoiceForm/>
        </Container>
      </div> */}
    </main>
  )
}