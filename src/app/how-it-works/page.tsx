"use client";

import { Metadata } from "next";
import React from 'react';
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import HowItWorksDetailed from "@/sections/HowItWorksDetailed";
import { generateCanonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "How It Works | VitalPredict AI",
  description: "Learn how VitalPredict AI's technology predicts hypoglycemic events before they happen using voice biomarkers and advanced algorithms.",
  alternates: {
    canonical: generateCanonicalUrl({ path: '/how-it-works' }),
  },
};

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
