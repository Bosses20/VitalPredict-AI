"use client";

import React from 'react';
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import HowItWorksDetailed from "@/sections/HowItWorksDetailed";

// Moved metadata to layout.tsx or directly in app/page.tsx to avoid conflicts with "use client"

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
