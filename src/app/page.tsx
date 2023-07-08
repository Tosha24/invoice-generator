"use client";

// import Login from "@/components/Login";
import Container from "react-bootstrap/Container";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-x-hidden overflow-y-scroll m-0 p-0">
      <Navbar/>
      <Banner/>
      {/* <div>
        <Container>
          <InvoiceForm/>
        </Container>
      </div> */}
    </main>
  )
}