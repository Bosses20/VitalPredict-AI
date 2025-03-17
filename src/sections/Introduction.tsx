"use client";

import Tag from "../components/Tag";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useAnimation } from "framer-motion";

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
    const statsScrollRef = useRef<HTMLDivElement>(null);
    const [activeStatIndex, setActiveStatIndex] = useState(0);
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
    const statsControls = useAnimation();
    
    // Create scroll-linked animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
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
    
    // For parallax scrolling effect
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    
    // Auto-scrolling carousel for mobile stats
    useEffect(() => {
        if (!statsScrollRef.current || !isStatsInView || !autoScrollEnabled) return;
        
        // Calculate card width and total width
        const cardWidth = 280 + 16; // card width + gap
        const totalWidth = cardWidth * stats.length;
        
        // Create infinite loop animation with proper timing
        statsControls.start({
            x: [-cardWidth, -(totalWidth + cardWidth)],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: stats.length * 3, // Time based on number of cards (3 seconds per card)
                    ease: "linear",
                    repeatDelay: 0.5, // Small delay between loops
                }
            }
        });
        
        // Function to update active index based on scroll position
        const updateActiveIndex = () => {
            if (!statsScrollRef.current) return;
            const scrollLeft = statsScrollRef.current.scrollLeft;
            const newIndex = Math.round(scrollLeft / cardWidth) % stats.length;
            
            if (newIndex !== activeStatIndex && newIndex >= 0 && newIndex < stats.length) {
                setActiveStatIndex(newIndex);
            }
        };
        
        // Handle manual scroll interactions
        const handleManualInteraction = () => {
            // Pause animation when user interacts
            statsControls.stop();
            updateActiveIndex();
            
            // Resume animation after user inactivity
            const resumeTimeout = setTimeout(() => {
                if (autoScrollEnabled) {
                    statsControls.start({
                        x: [-cardWidth, -(totalWidth + cardWidth)],
                        transition: {
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: stats.length * 3,
                                ease: "linear",
                                repeatDelay: 0.5,
                            }
                        }
                    });
                }
            }, 3000);
            
            return resumeTimeout;
        };
        
        // Reset animation when window is resized
        const handleResize = () => {
            if (autoScrollEnabled) {
                statsControls.stop();
                statsControls.start({
                    x: [-cardWidth, -(totalWidth + cardWidth)],
                    transition: {
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: stats.length * 3,
                            ease: "linear",
                            repeatDelay: 0.5,
                        }
                    }
                });
            }
        };
        
        // Attach event listeners
        statsScrollRef.current.addEventListener('touchstart', handleManualInteraction);
        statsScrollRef.current.addEventListener('mousedown', handleManualInteraction);
        statsScrollRef.current.addEventListener('scroll', updateActiveIndex);
        window.addEventListener('resize', handleResize);
        
        let resumeTimeout: NodeJS.Timeout;
        
        return () => {
            statsControls.stop();
            clearTimeout(resumeTimeout);
            
            if (statsScrollRef.current) {
                statsScrollRef.current.removeEventListener('touchstart', handleManualInteraction);
                statsScrollRef.current.removeEventListener('mousedown', handleManualInteraction);
                statsScrollRef.current.removeEventListener('scroll', updateActiveIndex);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [isStatsInView, autoScrollEnabled, activeStatIndex, stats.length, statsControls]);
    
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
                <div className="stats-section relative w-full mt-4 md:mt-16" ref={statsRef}>
                    {/* Problem statement */}
                    <div className="text-center mb-8 md:mb-12">
                        <motion.div 
                            className="flex items-center justify-center gap-2 mb-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-red-500">✕</span> 
                            <span className="text-white/80">Families live </span>
                            <span className="text-teal-400 font-semibold">in</span>
                            <span className="text-white/80"> constant fear </span>
                            <span className="text-teal-400 font-semibold">of</span>
                            <span className="text-white/80"> sudden collapses.</span>
                        </motion.div>
                    </div>
                    
                    {/* Mobile stats with swipe support */}
                    <div className="md:hidden mt-8">
                        <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide smooth-scroll" ref={statsScrollRef}>
                            <motion.div 
                                className="flex flex-nowrap gap-4 w-full pl-4 pr-16"
                                animate={statsControls}
                                whileHover={{ animationPlayState: "paused" }}
                            >
                                {/* Duplicate stats cards for infinite loop effect */}
                                {[...stats, ...stats].map((stat, index) => (
                                    <motion.div 
                                        key={`stat-mobile-${index}`}
                                        className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-3xl p-5 min-w-[280px] max-w-[280px] flex-shrink-0 shadow-xl shadow-black/20 backdrop-blur-sm border border-white/5 scroll-snap-card stat-card" data-index={index % stats.length}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ 
                                            delay: 0.1 * (index % stats.length),
                                            duration: 0.4,
                                        }}
                                        whileHover={{ 
                                            scale: 1.02,
                                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4)",
                                            border: "1px solid rgba(255, 255, 255, 0.1)"
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <motion.div 
                                                className="text-5xl font-bold text-lime-400 font-mono tracking-tight"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    delay: 0.3 + (index % stats.length) * 0.2
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
                                                    delay: 0.4 + (index % stats.length) * 0.2
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
                                                    delay: 0.5 + (index % stats.length) * 0.2
                                                }}
                                            >
                                                {stat.description}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                            
                            {/* Scroll indicator */}
                            <div className="flex justify-center mt-4">
                                <div className="flex gap-1.5">
                                    {stats.map((_, index) => (
                                        <div 
                                            key={`indicator-${index}`} 
                                            className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${index === activeStatIndex ? 'bg-lime-400' : 'bg-white/20'}`}
                                            onClick={() => {
                                                // Manual navigation
                                                if (!statsScrollRef.current) return;
                                                setActiveStatIndex(index);
                                                const cardWidth = 280 + 16; // card width + gap
                                                statsScrollRef.current.scrollTo({
                                                    left: index * cardWidth,
                                                    behavior: 'smooth'
                                                });
                                            }}
                                        />
                                    ))}
                                </div>
                                
                                {/* Auto-scroll toggle */}
                                <button 
                                    className="ml-4 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 border border-white/10 text-xs"
                                    onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
                                    aria-label={autoScrollEnabled ? "Pause auto-scroll" : "Enable auto-scroll"}
                                >
                                    {autoScrollEnabled ? "∥" : "▶"}
                                </button>
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
