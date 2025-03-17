import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import LogoTicker from "@/sections/LogoTicker";
import Introduction from "@/sections/Introduction";
import Features from "@/sections/Features";
import HowItWorks from "@/sections/HowItWorks";
import WhatPeopleAreSaying from "@/sections/WhatPeopleAreSaying";
import PreSaleOffer from "@/sections/PreSaleOffer";
import Faqs from "@/sections/Faqs";
import CallToAction from "@/sections/CallToAction";
import Footer from "@/sections/Footer";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <main className="overflow-x-hidden min-h-screen">
              <Introduction />
              <LogoTicker />
              <Features />
              <HowItWorks />
              <WhatPeopleAreSaying />
              <PreSaleOffer />
              <Faqs />
              <CallToAction />
            </main>
            <Footer />
        </>
    );
}
