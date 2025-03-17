"use client";

import Tag from "@/components/Tag";
import FeatureCard from "@/components/FeatureCard";
import Image from "next/image";
import avatar1 from "@/assets/images/avatar-ashwin-santiago.jpg";
import avatar2 from "@/assets/images/avatar-lula-meyers.jpg";
import avatar3 from "@/assets/images/avatar-florence-shaw.jpg";
import Avatar from "@/components/Avatar";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const features = [
    "Root Cause Insights",
    "Family Access Portal",
    "Predictive Travel Mode",
    "Clinical Trial Matching",
    "Silent Crisis Detection",
    "Smartwatch Panic Button",
    "Voice Journaling + Mood Tracking"
];

export default function Features() {
    const sectionRef = useRef<HTMLElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const featureChipsRef = useRef<HTMLDivElement>(null);
    
    // Create scroll-linked animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    
    // Different elements will have different parallax effects
    const tagY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);
    
    // Check if elements are in view for sequential animations
    const isTagInView = useInView(tagRef, { once: true, amount: 0.5 });
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
    const isFeatureChipsInView = useInView(featureChipsRef, { once: true, amount: 0.5 });

    return (
        <section 
            id="features"
            ref={sectionRef} 
            className="py-24 relative overflow-hidden"
        >
            <div className="container">
                <div className="flex justify-center" ref={tagRef}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isTagInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ y: tagY }}
                    >
                        <Tag>Features</Tag>
                    </motion.div>
                </div>
                
                <div ref={titleRef}>
                    <motion.h2 
                        className="text-6xl font-medium text-center mt-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        style={{ y: titleY }}
                    >
                        How VitalPredict <span className="text-lime-400">Saves Lives</span>
                    </motion.h2>
                </div>

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <FeatureCard 
                        title="Real-Time Crisis Alerts" 
                        description="Receive SMS alerts 30 minutes before a potential hypoglycemia crisis-giving you a critical window to act" 
                        className="col-span-1"
                        index={0}
                    >
                        <motion.div 
                            className="aspect-video flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-4xl font-extrabold text-white/20 text-center">
                                We&apos;ve prevented <motion.span 
                                    className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                                    animate={{ 
                                        backgroundPosition: ["0%", "100%", "0%"],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{ backgroundSize: "200% 100%" }}
                                >88% of ER visits</motion.span> for early adopters
                            </p>
                        </motion.div>
                    </FeatureCard>
                      
                    <FeatureCard 
                        title="Voice Analysis" 
                        description="AI detects vocal tremors-a proven biomarker for hypoglycemia" 
                        className="col-span-1"
                        index={1}
                    >
                        <div className="aspect-video flex items-center justify-center relative bg-gradient-to-b from-cyan-950 to-transparent">
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)]"></div>
                                {/* Waveform Base */}
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-cyan-500/20"></div>
                                        
                                {/* Main Waveform Pattern */}
                                <div className="relative h-full flex items-center justify-center gap-0.5">
                                    {Array.from({length: 32}).map((_, i) => (
                                        <motion.div 
                                            key={i} 
                                            className="w-1 rounded-full bg-gradient-to-b from-cyan-400 to-blue-600"
                                            initial={{ height: "60%" }}
                                            animate={{ 
                                                height: `${Math.sin((Date.now() / 500) + i * 0.3) * 50 + 60}%`,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: Infinity,
                                                repeatType: "mirror",
                                                delay: i * 0.02
                                            }}
                                            style={{
                                                opacity: i % 3 === 0 ? 0.9 : 0.3
                                            }}
                                        ></motion.div>
                                    ))}
                                </div>
                                        
                                {/* Highlight Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-cyan-950 via-transparent to-cyan-950"></div>
                            </div>
                            
                            {/* AI Analysis Indicators */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
                                <motion.div 
                                    className="px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-1.5"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <motion.div 
                                        className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    ></motion.div>
                                    <span className="text-[10px] text-cyan-400">Analyzing Voice Pattern</span>
                                </motion.div>
                                <div className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                    <span className="text-[10px] text-emerald-400">Biomarkers Normal</span>
                                </div>
                            </div>
                        </div>
                    </FeatureCard>

                    <FeatureCard 
                        title="Sleep Safety Mode" 
                        description="Nighttime alerts vibrate your pillow if glucose drops dangerously." 
                        className="col-span-1"
                        index={2}
                    >
                        <div className="aspect-video flex items-center justify-center relative bg-gradient-to-b from-indigo-950 to-transparent overflow-hidden">
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]"></div>
                                
                                {/* Stars Background */}
                                <div className="absolute inset-0">
                                    {Array.from({length: 20}).map((_, i) => (
                                        <motion.div 
                                            key={i}
                                            className="absolute w-0.5 h-0.5 bg-white rounded-full"
                                            animate={{
                                                opacity: [0.3, 0.8, 0.3],
                                                scale: [1, 1.2, 1]
                                            }}
                                            transition={{
                                                duration: Math.random() * 2 + 1,
                                                repeat: Infinity,
                                                delay: Math.random() * 2
                                            }}
                                            style={{
                                                top: `${Math.random() * 100}%`,
                                                left: `${Math.random() * 100}%`,
                                            }}
                                        ></motion.div>
                                    ))}
                                </div>
                                
                                {/* Main Display */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        {/* Pillow Visualization */}
                                        <motion.div 
                                            className="w-56 h-28 bg-gradient-to-b from-indigo-800/30 to-purple-900/30 rounded-2xl border border-indigo-500/30 backdrop-blur-sm relative overflow-hidden"
                                            animate={{ 
                                                scale: [1, 1.02, 1],
                                                rotate: [0, 0.5, 0]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/5 to-transparent"></div>
                                            
                                            {/* Sleep Monitoring Display */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    {Array.from({length: 3}).map((_, i) => (
                                                        <motion.div 
                                                            key={i}
                                                            className="w-1 h-1 rounded-full bg-indigo-400"
                                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                                            transition={{
                                                                duration: 1.5,
                                                                repeat: Infinity,
                                                                delay: i * 0.5
                                                            }}
                                                        ></motion.div>
                                                    ))}
                                                </div>
                                                <div className="text-[10px] text-indigo-300">Sleep Monitoring Active</div>
                                            </div>
                                        </motion.div>
                                        
                                        {/* Status Indicators */}
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                                            <motion.div 
                                                className="px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-1.5"
                                                animate={{ opacity: [1, 0.7, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <motion.div 
                                                    className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                ></motion.div>
                                                <span className="text-[10px] text-indigo-400">Glucose Level Safe</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FeatureCard>

                    <FeatureCard 
                        title="Emergency Contacts" 
                        description="Auto-notify loved ones if you don't respond to an alert." 
                        className="col-span-1"
                        index={3}
                    >
                        <div className="aspect-video flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Avatar className="z-40">
                                    <Image src={avatar1} alt="Avatar 1" className="rounded-full"/>
                                </Avatar>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Avatar className="-ml-6 border-indigo-500" z-30>
                                    <Image src={avatar2} alt="Avatar 2" className="rounded-full"/>
                                </Avatar>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Avatar className="-ml-6 border-amber-500" z-20>
                                    <Image src={avatar3} alt="Avatar 3" className="rounded-full"/>
                                </Avatar>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Avatar className="-ml-6 border-transparent">
                                    <div className="size-full bg-neutral-700 rounded-full inline-flex items-center justify-center gap-1">
                                        {Array.from({length: 3}).map((_, i) => (
                                            <motion.span 
                                                key={i} 
                                                className="size-1.5 rounded-full bg-white inline-flex"
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    delay: i * 0.3
                                                }}
                                            ></motion.span>
                                        ))}
                                    </div>
                                </Avatar>
                            </motion.div>
                        </div>
                    </FeatureCard>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 justify-center" ref={featureChipsRef}>
                    {features.map((feature, index) => (
                        <motion.div 
                            key={feature} 
                            className="bg-neutral-900 border border-white/10 inline-flex px-3 py-1.5 rounded-2xl gap-3 items-center cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={isFeatureChipsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 0 15px rgba(163, 230, 53, 0.3)",
                                backgroundColor: "rgba(23, 23, 23, 0.8)",
                                borderColor: "rgba(163, 230, 53, 0.3)",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ 
                                scale: 0.95,
                                boxShadow: "0 0 20px rgba(163, 230, 53, 0.4)",
                                backgroundColor: "rgba(23, 23, 23, 0.9)",
                                borderColor: "rgba(163, 230, 53, 0.5)",
                                transition: { duration: 0.1 }
                            }}
                        >
                            <motion.span 
                                className="bg-lime-400 text-neutral-950 size-5 rounded-full inline-flex items-center justify-center text-xl"
                                animate={{ 
                                    rotate: [0, 360],
                                    transition: {
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }
                                }}
                                whileHover={{
                                    scale: 1.2,
                                    rotate: [0, 360],
                                    transition: {
                                        scale: { duration: 0.2 },
                                        rotate: {
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }
                                    }
                                }}
                                whileTap={{
                                    scale: 1.3,
                                    rotate: [0, 360],
                                    transition: {
                                        scale: { duration: 0.1 },
                                        rotate: {
                                            duration: 0.5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }
                                    }
                                }}
                            >
                                &#10038;
                            </motion.span>
                            <span className="font-medium">{feature}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
