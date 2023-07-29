"use client";

import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-x-hidden overflow-y-scroll m-0 p-0 font-bodyFont">
      <Navbar btn="LOGIN"/>
      <Banner/>
    </main>
  )
}