"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tag from "@/components/Tag";
import { twMerge } from "tailwind-merge";

// Add a style to remove focus outlines
const svgStyle = {
    outline: "none",
    WebkitTapHighlightColor: "transparent"
};

const faqs = [
    {
        question: "How accurate is VitalPredict AI in predicting hypoglycemia?",
        answer: "VitalPredict AI achieves 85% accuracy in beta testing, validated by clinical studies and user-reported outcomes. Our algorithm cross-checks 37+ biomarkers in your voice and glucose data, with continuous improvements through machine learning."
    },
    {
        question: "Is my health data safe?",
        answer: "Absolutely. We use military-grade encryption and comply with HIPAA/GDPR standards. Your data is never sold or shared without consent."
    },
    {
        question: "How much does VitalPredict AI cost?",
        answer: "Our standard pricing will be $30/month after launch. However, our first 100 early adopters get lifetime access for a one-time payment of $200 (67% off) with no recurring fees ever."
    },
    {
        question: "Why should I pay $200 now instead of waiting?",
        answer: "Early access secures lifetime access before subscriptions go live at $30/month. That's $360/year vs. a one-time $200 payment. Plus, early users get priority support, feature requests, and Sleep Safety Mode ($200 value) included free."
    },
    {
        question: "What if I can't afford $200?",
        answer: "Join our waitlist for updates. We'll alert you about subsidized plans post-launch and clinical trials offering free access. We're also partnering with clinics to donate licenses to diabetics in need."
    },
    {
        question: "Does it work with my glucose monitor/smartwatch?",
        answer: "Yes! Syncs seamlessly with LibreView, Dexcom, Apple Watch, and Fitbit. Manual logging is also available."
    },
    {
        question: "How does AI predict hypoglycemia from my voice?",
        answer: "Vocal tremors, pitch, and speech patterns are proven biomarkers for hypoglycemia. Our tech, developed with Johns Hopkins researchers, detects these subtle changes."
    },
    {
        question: "What happens if I don't respond to an alert?",
        answer: "After 5 minutes, we automatically notify your pre-set emergency contacts with your location and status."
    },
    {
        question: "What research backs this?",
        answer: "Peer-reviewed studies confirm vocal analysis as a hypoglycemia predictor. Read our whitepaper for details."
    }
];

export default function Faqs() {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    return (
        <section id="faqs" className="py-24">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
                    <p className="text-lg text-white/60">
                        If you don&apos;t find the answer you&apos;re looking for, please reach out to us.
                    </p>
                </div>
                <div className="mt-12 flex flex-col gap-6 max-w-xl mx-auto">
                    {faqs.map((faq, faqIndex) => (
                        <motion.div 
                            key={faq.question} 
                            className="bg-neutral-900 rounded-2xl border border-white/10 p-6"
                            whileHover={{ 
                                backgroundColor: "rgba(23, 23, 23, 0.8)",
                                borderColor: selectedIndex === faqIndex ? "rgba(163, 230, 53, 0.3)" : "rgba(255, 255, 255, 0.15)",
                                transition: { duration: 0.2 }
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.4, 
                                delay: faqIndex * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                        >
                            <div 
                                className="flex justify-between items-center cursor-pointer" 
                                onClick={() => setSelectedIndex(selectedIndex === faqIndex ? -1 : faqIndex)}
                                style={{ outline: "none" }}
                            >
                                <motion.h3 
                                    className="font-medium"
                                    animate={{ 
                                        color: "#ffffff"
                                    }}
                                    transition={{ duration: 0.3 }}
                                >{faq.question}</motion.h3>
                                <motion.svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="feather feather-plus text-lime-400 flex-shrink-0"
                                    animate={{ 
                                        rotate: selectedIndex === faqIndex ? 45 : 0,
                                        scale: [1, selectedIndex === faqIndex ? 1.1 : 1]
                                    }}
                                    transition={{ duration: 0.3 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedIndex(selectedIndex === faqIndex ? -1 : faqIndex);
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={svgStyle}
                                >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </motion.svg>
                            </div>
                            
                            <AnimatePresence>
                            {selectedIndex === faqIndex && (
                                <motion.div 
                                    initial={{ 
                                        height: 0,
                                        marginTop: 0,
                                        opacity: 0
                                    }} 
                                    animate={{ 
                                        height: 'auto',
                                        marginTop: 24,
                                        opacity: 1
                                    }} 
                                    exit={{
                                        height: 0,
                                        marginTop: 0,
                                        opacity: 0
                                    }} 
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut"
                                    }}
                                    className="overflow-hidden"
                                >
                                    <motion.p 
                                        className="text-white/50"
                                        initial={{ y: 10 }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >{faq.answer}</motion.p>
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
