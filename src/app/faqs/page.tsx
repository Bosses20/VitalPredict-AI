"use client";

import React from 'react';
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import Faqs from "@/sections/Faqs";
import AnalyticsProvider from '@/components/AnalyticsProvider';

export default function FAQsPage() {
  return (
    <AnalyticsProvider>
      <Navbar />
      <main className="overflow-x-hidden min-h-screen pt-20">
        <Faqs />
      </main>
      <Footer />
    </AnalyticsProvider>
  );
}
