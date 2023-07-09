import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import invoice from "/public/assets/images/invoice.jpg";

const Banner = () => {
  return (
    <section className="max-w-container flex flex-row">
      <div className='flex flex-col min-w-fit gap-3 lg:gap-7 py-16 md:py-32 mx-[10%] lg:mr-0'>
      <h3 className="text-sm font-titleFont tracking-widest text-primaryColor">
        MEET EZ-INVOICE
      </h3>
      <h1 className="font-titleFont text-3xl lg:text-5xl font-medium flex flex-col">
        Simplify Invoice management.
        <span className="text-textDark mt-2 lg:mt-4 text-2xl lg:text-4xl">
          Amplify cash flow.
        </span>
      </h1>
      <p className="font-bodyFont text-base md:max-w-[650px] font-normal text-justify">
        Create tax and discount rate included invoices and manage them in one
        place. Manage your invoices and clients with ease.
      </p>
      <Link href="/signup" className='w-48'>
        <button className="border w-48 h-12 text-lg text-white border-primaryColor bg-primaryColor tracking-wide font-titleFont hover:bg-hoverColor duration-300">
          Get started
        </button>
      </Link>
      </div>
      <div className='hidden lg:inline-flex'>
        <Image src={invoice} alt="bg" />
      </div>
    </section>
  );
};

export default Banner;
