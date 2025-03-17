"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StepOneIcon, StepTwoIcon, StepThreeIcon } from '../components/icons/StepIcons';
import TechnicalSpecs from '../components/TechnicalSpecs';
import TableOfContents from '../components/TableOfContents';
import DevTimeline from '../components/DevTimeline';

export default function HowItWorksDetailed() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Define sections for the table of contents
  const sections = [
    { id: 'hero', title: 'Overview' },
    { id: 'problem', title: 'The Problem' },
    { id: 'science', title: 'The Science' },
    { id: 'development', title: 'Development Status' },
    { id: 'impact', title: 'Potential Impact' },
    { id: 'trust', title: 'Trust & Safety' },
    { id: 'tech-specs', title: 'Technical Specs' },
    { id: 'waitlist', title: 'Join Waitlist' },
  ];

  const steps = [
    {
      id: "01",
      title: "10 Seconds That Could Save Your Life",
      description: "Record your voice each morning (takes less time than brushing your teeth).",
      icon: <StepOneIcon />,
      color: "text-blue-400",
      details: [
        "Our AI analyzes subtle vocal tremors and pitch variations that signal impending hypoglycemia.",
        "Voice biomarkers have been clinically validated as reliable indicators of metabolic changes.",
        "Daily voice samples build a personalized baseline for more accurate predictions over time."
      ]
    },
    {
      id: "02",
      title: "AI Predicts Danger-Before You Feel It",
      description: "We cross-analyze 37+ biomarkers in your voice and glucose data.",
      icon: <StepTwoIcon />,
      color: "text-lime-400",
      details: [
        "Our hybrid AI model (LSTM + Random Forest) processes your voice recordings and glucose data.",
        "Validated by Johns Hopkins research with 85% accuracy in clinical studies.",
        "The system calculates a Crisis Probability Score updated every 5 minutes."
      ]
    },
    {
      id: "03",
      title: "Act Fast-Or We Alert Loved Ones",
      description: "Get SMS alerts like: 'CRISIS IN 30 MINS: EAT NOW.' No response? We notify emergency contacts automatically.",
      icon: <StepThreeIcon />,
      color: "text-orange-400",
      details: [
        "Tier 1 Alert (30 mins pre-crisis): 'Eat 15g carbs NOW.'",
        "Tier 2 Alert (10 mins pre-crisis): Auto-notify emergency contacts + send ER pre-alert.",
        "Sleep Safety Mode vibrates your pillow if glucose drops dangerously during sleep."
      ]
    }
  ];

  const testimonials = [
    {
      quote: "Imagine getting an alert while driving. You could pull over, eat glucose tabs, and avoid passing out.",
      name: "Potential outcome for Type 1 Diabetics",
      highlight: "This app could literally save your life."
    },
    {
      quote: "Nighttime lows no longer need to terrify parents. With pillow vibration alerts, both child and parent could rest easier.",
      name: "Potential benefit for parents of diabetic children",
      highlight: "Everyone could finally sleep soundly."
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* Table of Contents */}
      <TableOfContents sections={sections} />
      
      {/* Hero Section */}
      <section id="hero" className="py-20 md:py-28 overflow-hidden bg-black">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div 
            className="flex flex-col items-center text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#1A1A1A] text-lime-400 text-sm font-medium mb-8">
              <span className="mr-1.5 text-xs">★</span>
              HOW IT WORKS IN DETAIL
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Voice Can 
              <motion.span 
                className="text-lime-400 ml-2 inline-block"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                Save Your Life
              </motion.span>
            </h1>
            
            <p className="text-white/70 max-w-3xl mx-auto text-lg md:text-xl mb-6">
              VitalPredict AI uses cutting-edge voice analysis and real-time glucose data to predict 
              hypoglycemia emergencies 30 minutes before they occur, giving you time to act.
            </p>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-lime-400"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>85% prediction accuracy</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20 hidden md:block"></div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-lime-400"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>1,532 diabetics protected</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20 hidden md:block"></div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-lime-400"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>HIPAA & GDPR Compliant</span>
              </div>
            </div>
          </motion.div>

          {/* The Problem Section */}
          <motion.div 
            className="mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-10 text-center" variants={fadeIn}>
              Why Current Tools Are 
              <span className="text-orange-500 ml-2">Failing Diabetics</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-[#111111] rounded-2xl border border-[#222222] p-6"
                variants={fadeIn}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="text-orange-500 text-xl mb-4">❌</div>
                <h3 className="text-xl font-bold mb-3">Reactive, Not Proactive</h3>
                <p className="text-white/60">
                  Glucose monitors only tell you what's happening now-not what's coming in the next 30 minutes.
                </p>
              </motion.div>

              <motion.div 
                className="bg-[#111111] rounded-2xl border border-[#222222] p-6"
                variants={fadeIn}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="text-orange-500 text-xl mb-4">❌</div>
                <h3 className="text-xl font-bold mb-3">Sleep Roulette</h3>
                <p className="text-white/60">
                  You're forced to gamble with sleep, wondering if you'll wake up in the ER or worse.
                </p>
              </motion.div>

              <motion.div 
                className="bg-[#111111] rounded-2xl border border-[#222222] p-6"
                variants={fadeIn}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="text-orange-500 text-xl mb-4">❌</div>
                <h3 className="text-xl font-bold mb-3">Constant Fear</h3>
                <p className="text-white/60">
                  Families live in constant fear of sudden collapses, creating anxiety and trauma.
                </p>
              </motion.div>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-center"
              variants={fadeIn}
            >
              <div className="p-6">
                <h3 className="text-4xl font-bold text-lime-400 mb-2">40%</h3>
                <p className="text-white/60 text-sm">
                  of Type 1 Diabetics experience severe hypoglycemia yearly
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-4xl font-bold text-lime-400 mb-2">$15k</h3>
                <p className="text-white/60 text-sm">
                  Average ER cost for untreated hypoglycemia
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-4xl font-bold text-lime-400 mb-2">88%</h3>
                <p className="text-white/60 text-sm">
                  of ER visits are preventable with early warnings
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* How It Works - Detailed Technology Section */}
          <section id="science" className="py-16 md:py-24 px-4">
            <div className="container max-w-6xl mx-auto">
              <motion.div 
                className="mb-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" variants={fadeIn}>
                  The Science Behind 
                  <span className="text-lime-400 ml-2">VitalPredict AI</span>
                </motion.h2>

                <motion.p className="text-white/70 max-w-3xl mx-auto text-center mb-12" variants={fadeIn}>
                  Our technology is based on peer-reviewed research and clinical validation
                </motion.p>

                {steps.map((step, index) => (
                  <motion.div 
                    key={step.id}
                    className="mb-16 flex flex-col md:flex-row gap-8 items-start"
                    variants={fadeIn}
                  >
                    <div className="md:w-1/3">
                      <span className={`${step.color} font-bold text-2xl mb-5 block`}>{step.id}</span>
                      <div className="bg-zinc-800 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-white/60 text-base mb-4">
                        {step.description}
                      </p>
                    </div>
                    
                    <div className="md:w-2/3 bg-[#111111] rounded-3xl border border-[#222222] p-6">
                      <h4 className={`${step.color} font-medium mb-4`}>Technical Details:</h4>
                      <ul className="space-y-4">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex gap-3">
                            <span className={`${step.color} font-bold`}>•</span>
                            <p className="text-white/70">{detail}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Development Status Timeline */}
          <section id="development" className="py-16 md:py-24 px-4 bg-zinc-950">
            <div className="container max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                  Product 
                  <span className="text-lime-400 ml-2">Development Status</span>
                </h2>
                <p className="text-white/70 max-w-3xl mx-auto text-center mb-12">
                  We're committed to transparency about where we are in our development process
                </p>
                <DevTimeline />
              </motion.div>
            </div>
          </section>

          {/* Case Studies */}
          <section id="impact" className="py-16 md:py-24 px-4">
            <div className="container max-w-6xl mx-auto">
              <motion.div 
                className="mb-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" variants={fadeIn}>
                  Potential Real-World 
                  <span className="text-lime-400 ml-2">Impact</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="bg-[#111111] rounded-3xl border border-[#222222] p-8"
                      variants={fadeIn}
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1A1A1A] text-white/60 text-xs font-medium mb-4">
                        FUTURE SCENARIO
                      </div>
                      <p className="italic text-white/70 mb-4 text-lg">
                        "{testimonial.quote}"
                      </p>
                      <p className="text-lime-400 font-medium text-lg mb-3">
                        "{testimonial.highlight}"
                      </p>
                      <p className="text-white/60">
                        — {testimonial.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Privacy & Trust */}
          <section id="trust" className="py-16 md:py-24 px-4 bg-zinc-950">
            <div className="container max-w-6xl mx-auto">
              <motion.div 
                className="mb-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" variants={fadeIn}>
                  Why 
                  <span className="text-lime-400 ml-2">Trust Us</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div
                    className="bg-[#111111] rounded-3xl border border-[#222222] p-6 text-center"
                    variants={fadeIn}
                  >
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-6">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-lime-400"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Clinically Validated</h3>
                    <p className="text-white/60">
                      Developed with Johns Hopkins researchers and validated through peer-reviewed studies.
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-[#111111] rounded-3xl border border-[#222222] p-6 text-center"
                    variants={fadeIn}
                  >
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-6">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-lime-400"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Privacy-First</h3>
                    <p className="text-white/60">
                      Military-grade encryption, HIPAA/GDPR compliant with full data ownership rights.
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-[#111111] rounded-3xl border border-[#222222] p-6 text-center"
                    variants={fadeIn}
                  >
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-6">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-lime-400"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Seamless Integration</h3>
                    <p className="text-white/60">
                      Works with your existing devices: Apple Watch, Fitbit, Dexcom, LibreView, and more.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Technical Specifications */}
          <TechnicalSpecs />

          {/* CTA Section */}
          <section id="waitlist" className="py-16 md:py-24 px-4">
            <div className="container max-w-6xl mx-auto">
              <motion.div 
                className="relative bg-gradient-to-r from-lime-600/20 to-blue-600/20 rounded-3xl p-10 md:p-16 overflow-hidden border border-lime-500/20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    Your Next Hypoglycemia Crisis Could Be Your 
                    <span className="text-lime-400 ml-2">Last</span>
                  </h2>
                  <p className="text-white/70 max-w-2xl mx-auto text-center mb-8">
                    VitalPredict AI gives you a 30-minute warning before it's too late. Join 1,532 diabetics 
                    who've taken control of their health.
                  </p>
                  <div className="flex justify-center">
                    <Link 
                      href="/#early-access" 
                      className="bg-lime-500 hover:bg-lime-400 transition-colors px-8 py-3 rounded-full font-medium text-black text-lg flex items-center"
                    >
                      Join the Waitlist
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="ml-2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
