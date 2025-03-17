"use client";

import Link from "next/link";
import { StepOneIcon, StepTwoIcon, StepThreeIcon } from '../components/icons/StepIcons';
import { motion } from "framer-motion";

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 md:py-28 overflow-hidden bg-black">
            <div className="container max-w-6xl mx-auto px-4 md:px-6">
                {/* Header with pill */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#1A1A1A] text-lime-400 text-sm font-medium mb-8">
                        <span className="mr-1.5 text-xs">★</span>
                        HOW IT WORKS
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
                        Your <motion.span 
                            className="text-lime-400 inline-block"
                            animate={{ 
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        >3-Step</motion.span> Lifeline
                    </h2>
                    
                    <p className="text-xl font-medium mb-2.5">
                        Stop Crises Before They Start
                    </p>
                    
                    <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg">
                        No more guesswork. No more fear. Just science-backed protection.
                    </p>
                </div>
                
                {/* Three step cards with connecting gradients */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 relative">
                    {/* Connecting gradient lines - only visible on desktop */}
                    <div className="hidden md:block absolute top-1/2 left-[33%] w-[34%] h-px bg-gradient-to-r from-blue-400/10 via-lime-400/20 to-lime-400/10 transform -translate-y-1/2 z-0"></div>
                    <div className="hidden md:block absolute top-1/2 right-[33%] w-[34%] h-px bg-gradient-to-r from-lime-400/10 via-orange-400/20 to-orange-400/10 transform -translate-y-1/2 z-0"></div>
                    
                    {/* Step 1 */}
                    <motion.div 
                        className="bg-[#111111] rounded-3xl border border-[#222222] p-6 relative z-10"
                        whileHover={{ 
                            scale: 1.03, 
                            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <span className="text-blue-400 font-bold text-xl mb-5 block">01</span>
                        <div className="bg-zinc-800 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                            <StepOneIcon />
                        </div>
                        <h3 className="text-xl font-bold mb-3">10 Seconds That Could Save Your Life</h3>
                        <p className="text-white/60 text-sm mb-4">
                            Record your voice each morning (takes less time than brushing your teeth).
                        </p>
                        <p className="text-blue-400 text-sm font-medium">
                            Your voice holds hidden clues—let our AI decode them.
                        </p>
                    </motion.div>
                    
                    {/* Step 2 */}
                    <motion.div 
                        className="bg-[#111111] rounded-3xl border border-[#222222] p-6 relative z-10"
                        whileHover={{ 
                            scale: 1.03, 
                            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <span className="text-lime-400 font-bold text-xl mb-5 block">02</span>
                        <div className="bg-zinc-800 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                            <StepTwoIcon />
                        </div>
                        <h3 className="text-xl font-bold mb-3">AI Predicts Danger—Before You Feel It</h3>
                        <p className="text-white/60 text-sm mb-4">
                            We cross-analyze 37+ biomarkers in your voice and glucose data.
                        </p>
                        <p className="text-lime-400 text-sm font-medium">
                            Backed by Johns Hopkins research on vocal hypoglycemia detection.
                        </p>
                    </motion.div>
                    
                    {/* Step 3 */}
                    <motion.div 
                        className="bg-[#111111] rounded-3xl border border-[#222222] p-6 relative z-10"
                        whileHover={{ 
                            scale: 1.03, 
                            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <span className="text-orange-400 font-bold text-xl mb-5 block">03</span>
                        <div className="bg-zinc-800 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                            <StepThreeIcon />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Act Fast—Or We Alert Loved Ones</h3>
                        <p className="text-white/60 text-sm mb-4">
                            Get SMS alerts like: 'CRISIS IN 30 MINS: EAT NOW.' No response? We notify emergency contacts automatically.
                        </p>
                        <p className="text-orange-400 text-sm font-medium">
                            Even if you can't act, we've got you covered.
                        </p>
                    </motion.div>
                </div>
                
                {/* Testimonial */}
                <motion.div 
                    className="bg-[#111111] rounded-3xl border border-[#222222] p-6 max-w-3xl mx-auto mb-12"
                    whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
                        transition: { duration: 0.3 }
                    }}
                >
                    <p className="italic text-white/70 mb-2">
                        "I got the alert while driving. Pulled over, ate glucose tabs, and avoided passing out.
                    </p>
                    <p className="text-lime-400 font-medium mb-1">
                        This app literally saved my life.
                    </p>
                    <p className="text-white/70 mb-3">
                        "
                    </p>
                    <p className="text-sm text-white/60">
                        — Mark, Type 1 Diabetic
                    </p>
                </motion.div>
                
                {/* Call to Action - single line with hover button effect */}
                <div className="text-center">
                    <motion.div 
                        className="inline-flex flex-row items-center gap-2"
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <span className="text-white/60">Still skeptical?</span>
                        <Link
                            href="/how-it-works"
                            className="group inline-flex items-center"
                        >
                            <span className="text-lime-400 group-hover:text-lime-300 transition-colors font-medium flex items-center">
                                See how it works 
                                <motion.span 
                                    className="ml-1"
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ 
                                        duration: 1.5, 
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                >→</motion.span>
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
