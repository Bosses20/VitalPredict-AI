"use client";

import React from 'react';
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import HowItWorksDetailed from "@/sections/HowItWorksDetailed";

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden min-h-screen pt-20">
        <HowItWorksDetailed />
      </main>
      <Footer />
    </>
  );
}
