"use client";

import React from 'react';
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import PreSaleOffer from "@/sections/PreSaleOffer";
import AnalyticsProvider from '@/components/AnalyticsProvider';

export default function EarlyAccessPage() {
  return (
    <AnalyticsProvider>
      <Navbar />
      <main className="overflow-x-hidden min-h-screen pt-20">
        <PreSaleOffer />
      </main>
      <Footer />
    </AnalyticsProvider>
  );
}
