"use client";

import React from 'react';
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import Features from "@/sections/Features";
import AnalyticsProvider from '@/components/AnalyticsProvider';

export default function FeaturesPage() {
  return (
    <AnalyticsProvider>
      <Navbar />
      <main className="overflow-x-hidden min-h-screen pt-20">
        <Features />
      </main>
      <Footer />
    </AnalyticsProvider>
  );
}
