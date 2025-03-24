"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StepOneIcon, StepTwoIcon, StepThreeIcon } from '../components/icons/StepIcons';
import StepAnimation from "../components/StepAnimation";
import Tag from "../components/Tag";

// Custom button component with hover effects
const ActionButton = ({ children, href, className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.2 }}
  >
    <Link
      href={href}
      className={`inline-flex items-center bg-lime-400 hover:bg-lime-300 text-black px-4 py-2 rounded-full font-medium transition-colors ${className}`}
    >
      {children}
    </Link>
  </motion.div>
);

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    
    const steps = [
        {
            number: "01",
            color: "text-blue-400",
            bgColor: "from-blue-500/20 to-transparent",
            title: "10 Seconds That Could Save Your Life",
            description: "Record your voice each morning (takes less time than brushing your teeth).",
            highlight: "Your voice holds hidden clues—let our AI decode them.",
            highlightColor: "text-blue-400",
            icon: <StepOneIcon />,
            animation: <StepAnimation type="record" />
        },
        {
            number: "02",
            color: "text-lime-400",
            bgColor: "from-lime-500/20 to-transparent",
            title: "AI Predicts Danger—Before You Feel It",
            description: "We cross-analyze 37+ biomarkers in your voice and glucose data.",
            highlight: "Backed by Johns Hopkins research on vocal hypoglycemia detection.",
            highlightColor: "text-lime-400",
            icon: <StepTwoIcon />,
            animation: <StepAnimation type="analyze" />
        },
        {
            number: "03",
            color: "text-orange-400",
            bgColor: "from-orange-500/20 to-transparent",
            title: "Act Fast—Or We Alert Loved Ones",
            description: "Get SMS alerts like: 'CRISIS IN 30 MINS: EAT NOW.' No response? We notify emergency contacts automatically.",
            highlight: "Even if you can't act, we've got you covered.",
            highlightColor: "text-orange-400",
            icon: <StepThreeIcon />,
            animation: <StepAnimation type="alert" />
        }
    ];

    return (
        <section ref={sectionRef} id="how-it-works" className="py-20 md:py-28 overflow-hidden bg-black relative">
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.05),transparent_70%)]"></div>
            
            <div className="container max-w-6xl mx-auto px-4 md:px-6 relative z-10">
                {/* Header with pill */}
                <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <Tag>HOW IT WORKS</Tag>
                    </motion.div>
                    
                    <motion.h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 mt-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Your <span className="text-lime-400">3-Step</span> Lifeline
                    </motion.h2>
                    
                    <motion.p 
                        className="text-xl font-medium mb-2.5"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Stop Crises Before They Start
                    </motion.p>
                    
                    <motion.p 
                        className="text-white/60 max-w-2xl mx-auto text-base md:text-lg"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        No more guesswork. No more fear. Just science-backed protection.
                    </motion.p>
                </div>
                
                {/* Step selection tabs for mobile */}
                <div className="flex justify-center gap-2 mb-8 md:hidden">
                    {steps.map((step, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveStep(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                activeStep === index ? 'bg-lime-400 scale-125' : 'bg-white/20'
                            }`}
                            aria-label={`View step ${index + 1}`}
                        />
                    ))}
                </div>
                
                {/* Three step cards - Desktop View */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className={`bg-gradient-to-b from-[#101010] to-[#151515] rounded-3xl border border-[#222222] p-6 relative overflow-hidden group`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ 
                                duration: 0.7, 
                                delay: 0.2 + (index * 0.15),
                                type: "spring",
                                stiffness: 50
                            }}
                            whileHover={{ 
                                scale: 1.02,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            {/* Gradient overlay that appears on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${step.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                            
                            <span className={`${step.color} font-bold text-xl mb-5 block`}>{step.number}</span>
                            
                            <div className="flex justify-between items-start mb-5">
                                <div className="bg-zinc-800 w-16 h-16 rounded-xl flex items-center justify-center">
                                    {step.icon}
                                </div>
                                <div className="h-16 w-16 scale-75 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    {step.animation}
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-white/60 text-sm mb-4">
                                {step.description}
                            </p>
                            <p className={`${step.highlightColor} text-sm font-medium`}>
                                {step.highlight}
                            </p>
                        </motion.div>
                    ))}
                </div>
                
                {/* Mobile Step View - Swipeable Card */}
                <div className="md:hidden mb-12">
                    <motion.div
                        className="bg-gradient-to-b from-[#101010] to-[#151515] rounded-3xl border border-[#222222] p-6 relative overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ 
                            duration: 0.7,
                            type: "spring",
                            stiffness: 50
                        }}
                        key={activeStep} // Re-render when active step changes
                    >
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-b ${steps[activeStep].bgColor} opacity-30 transition-opacity duration-500 pointer-events-none`}></div>
                        
                        <span className={`${steps[activeStep].color} font-bold text-xl mb-5 block`}>{steps[activeStep].number}</span>
                        
                        <div className="flex justify-between items-start mb-5">
                            <div className="bg-zinc-800 w-16 h-16 rounded-xl flex items-center justify-center">
                                {steps[activeStep].icon}
                            </div>
                            <div className="h-16 w-16">
                                {steps[activeStep].animation}
                            </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3">{steps[activeStep].title}</h3>
                        <p className="text-white/60 text-sm mb-4">
                            {steps[activeStep].description}
                        </p>
                        <p className={`${steps[activeStep].highlightColor} text-sm font-medium`}>
                            {steps[activeStep].highlight}
                        </p>
                    </motion.div>
                </div>
                
                {/* Testimonial */}
                <motion.div 
                    className="bg-gradient-to-b from-[#101010] to-[#151515] rounded-3xl border border-[#222222] p-6 max-w-3xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.7 }}
                >
                    <div className="relative">
                        {/* Quote mark decoration */}
                        <div className="absolute -top-2 -left-2 text-4xl text-lime-400/20">"</div>
                        
                        <p className="italic text-white/70 mb-2 pl-6">
                            I got the alert while driving. Pulled over, ate glucose tabs, and avoided passing out.
                        </p>
                        <p className="text-lime-400 font-medium mb-1 pl-6">
                            This app literally saved my life.
                        </p>
                        <div className="absolute -bottom-4 -right-2 text-4xl text-lime-400/20 transform rotate-180">"</div>
                    </div>
                    <p className="text-sm text-white/60 mt-6 flex items-center">
                        <span className="inline-block w-5 h-5 rounded-full bg-lime-400/20 mr-2"></span>
                        Mark, Type 1 Diabetic
                    </p>
                </motion.div>
                
                {/* Call to Action */}
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 }}
                >
                    <p className="text-white/60 mb-4">Still skeptical?</p>
                    <ActionButton href="/early-access">
                        See how it works <span className="ml-1">→</span>
                    </ActionButton>
                </motion.div>
            </div>
        </section>
    );
}
