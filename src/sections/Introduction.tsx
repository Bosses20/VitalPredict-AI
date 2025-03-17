"use client";

import Tag from "../components/Tag";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Statistics data
const stats = [
    {
        value: "40%",
        title: "of Type 1 Diabetics",
        description: "Experience severe hypoglycemia yearly"
    },
    {
        value: "$15k",
        title: "Average ER Cost",
        description: "For untreated hypoglycemia"
    },
    {
        value: "88%",
        title: "of ER Visits",
        description: "Are Preventable with early warnings"
    }
];

export default function Introduction() {
    const sectionRef = useRef<HTMLElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const problemsRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    
    // Create scroll-linked animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    
    // Different elements will have different parallax effects
    const tagY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const problemsOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
    const problemsScale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
    
    // Check if elements are in view for sequential animations
    const isTagInView = useInView(tagRef, { once: true, amount: 0.5 });
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
    const isProblemsInView = useInView(problemsRef, { once: true, amount: 0.3 });
    const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
    
    return (
        <section className="py-28 relative overflow-hidden" ref={sectionRef}>
            <div className="container">
                <div className="flex justify-center" ref={tagRef}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isTagInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ y: tagY }}
                    >
                        <Tag>Introducing VitalPredict.ai</Tag>
                    </motion.div>
                </div>
                
                <div className="text-4xl text-center font-medium mt-10" ref={titleRef}>
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        style={{ y: titleY, display: "block" }}
                    >
                        Why Current Tools Are Failing Diabetics
                    </motion.span>
                    
                    <motion.div 
                        className="text-lg space-y-6 mt-8 max-w-3xl mx-auto text-left"
                        ref={problemsRef}
                        style={{ opacity: problemsOpacity, scale: problemsScale }}
                    >
                        {/* Problems with animations */}
                        <motion.p 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -30 }}
                            animate={isProblemsInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <motion.span 
                                className="text-red-500 text-xl"
                                initial={{ rotate: -90 }}
                                animate={isProblemsInView ? { rotate: 0 } : {}}
                                transition={{ duration: 0.3, delay: 0.3 }}
                            >
                                ✕
                            </motion.span>
                            <span>
                                Glucose monitors <span className="text-cyan-500">only</span> tell you <span className="font-bold">what's happening now</span>-<span className="text-red-500">not</span> what's coming.
                            </span>
                        </motion.p>
                        
                        <motion.p 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -30 }}
                            animate={isProblemsInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <motion.span 
                                className="text-red-500 text-xl"
                                initial={{ rotate: -90 }}
                                animate={isProblemsInView ? { rotate: 0 } : {}}
                                transition={{ duration: 0.3, delay: 0.5 }}
                            >
                                ✕
                            </motion.span>
                            <span>
                                You're forced <span className="text-cyan-500">to</span> <span className="font-bold">gamble with</span> sleep, wondering <span className="text-cyan-500">if</span> you'll wake up <span className="text-cyan-500">in</span> the ER.
                            </span>
                        </motion.p>
                        
                        <motion.p 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -30 }}
                            animate={isProblemsInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <motion.span 
                                className="text-red-500 text-xl"
                                initial={{ rotate: -90 }}
                                animate={isProblemsInView ? { rotate: 0 } : {}}
                                transition={{ duration: 0.3, delay: 0.7 }}
                            >
                                ✕
                            </motion.span>
                            <span>
                                Families live <span className="text-cyan-500">in</span> <span className="font-bold">constant</span> fear <span className="text-cyan-500">of</span> sudden collapses.
                            </span>
                        </motion.p>
                    </motion.div>
                </div>
                
                {/* Stats Cards */}
                <div className="stats-scroll relative w-full mt-16" ref={statsRef}>
                    {/* Mobile stats with horizontal scroll */}
                    <div className="md:hidden">
                        <div className="stats-scroll-inner">
                            <div className="inline-flex gap-6">
                                {stats.map((stat, index) => (
                                    <motion.div 
                                        key={`stat-mobile-1-${index}`}
                                        className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-3xl p-8 w-80 shadow-xl shadow-black/20 backdrop-blur-sm border border-white/5"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ 
                                            duration: 0.5, 
                                            delay: index * 0.2,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileHover={{ 
                                            y: -8, 
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <motion.div 
                                                className="text-5xl font-bold text-lime-400 font-mono tracking-tight"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    delay: 0.3 + index * 0.2
                                                }}
                                            >
                                                {stat.value}
                                            </motion.div>
                                            <motion.div 
                                                className="text-xl font-medium bg-gradient-to-r from-white to-white/90 text-transparent bg-clip-text whitespace-normal"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    delay: 0.4 + index * 0.2
                                                }}
                                            >
                                                {stat.title}
                                            </motion.div>
                                            <motion.div 
                                                className="text-sm text-white/50 leading-relaxed whitespace-normal"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    delay: 0.5 + index * 0.2
                                                }}
                                            >
                                                {stat.description}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="inline-flex gap-6">
                                {stats.map((stat, index) => (
                                    <motion.div 
                                        key={`stat-mobile-2-${index}`}
                                        className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-3xl p-8 w-80 shadow-xl shadow-black/20 backdrop-blur-sm border border-white/5"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ 
                                            duration: 0.5, 
                                            delay: 0.3 + index * 0.2,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileHover={{ 
                                            y: -8, 
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="text-5xl font-bold text-lime-400 font-mono tracking-tight">{stat.value}</div>
                                            <div className="text-xl font-medium bg-gradient-to-r from-white to-white/90 text-transparent bg-clip-text whitespace-normal">{stat.title}</div>
                                            <div className="text-sm text-white/50 leading-relaxed whitespace-normal">{stat.description}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop/tablet stats with staggered layout */}
                    <div className="hidden md:flex md:flex-row justify-center items-center gap-6">
                        {stats.map((stat, index) => (
                            <motion.div 
                                key={`stat-desktop-${index}`}
                                className={`bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-3xl p-8 w-80 shadow-xl shadow-black/20 backdrop-blur-sm border border-white/5 ${
                                    index === 0 ? "transform rotate-[-6deg]" :
                                    index === 1 ? "transform rotate-[4deg] translate-y-4" :
                                    "transform rotate-[-5deg] translate-y-8"
                                }`}
                                initial={{ 
                                    opacity: 0, 
                                    y: 50, 
                                    rotate: index === 0 ? -15 : 
                                            index === 1 ? 15 : -15
                                }}
                                animate={isStatsInView ? { 
                                    opacity: 1, 
                                    y: index === 0 ? 0 : 
                                        index === 1 ? 16 : 32, 
                                    rotate: index === 0 ? -6 : 
                                            index === 1 ? 4 : -5 
                                } : {}}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    delay: index * 0.2
                                }}
                                whileHover={{ 
                                    y: -8, 
                                    scale: 1.05,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className="flex flex-col gap-1">
                                    <motion.div 
                                        className="text-5xl font-bold text-lime-400 font-mono tracking-tight"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
                                        transition={{ 
                                            duration: 0.5, 
                                            delay: 0.5 + index * 0.2
                                        }}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <motion.div 
                                        className="text-xl font-medium bg-gradient-to-r from-white to-white/90 text-transparent bg-clip-text"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
                                        transition={{ 
                                            duration: 0.5, 
                                            delay: 0.6 + index * 0.2
                                        }}
                                    >
                                        {stat.title}
                                    </motion.div>
                                    <motion.div 
                                        className="text-sm text-white/50 leading-relaxed"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
                                        transition={{ 
                                            duration: 0.5, 
                                            delay: 0.7 + index * 0.2
                                        }}
                                    >
                                        {stat.description}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
