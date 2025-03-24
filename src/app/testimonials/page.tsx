"use client";

import React from 'react';
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import WhatPeopleAreSaying from "@/sections/WhatPeopleAreSaying";
import AnalyticsProvider from '@/components/AnalyticsProvider';

export default function TestimonialsPage() {
  return (
    <AnalyticsProvider>
      <Navbar />
      <main className="overflow-x-hidden min-h-screen pt-20">
        <WhatPeopleAreSaying />
      </main>
      <Footer />
    </AnalyticsProvider>
  );
}
