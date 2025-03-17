"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const sequences = [
    {
        id: 1,
        icon: "📱",
        title: "Recording Voice",
        description: "Good morning! How are you feeling today?",
        bgColor: "from-blue-400/10 to-purple-400/10",
        textColor: "text-blue-400"
    },
    {
        id: 2,
        icon: "🤖",
        title: "Analyzing Safety",
        description: "Cross-checking 37+ biomarkers...",
        bgColor: "from-emerald-400/10 to-lime-400/10",
        textColor: "text-lime-400"
    },
    {
        id: 3,
        icon: "🔴",
        title: "ACTION REQUIRED",
        description: "30 MINUTES TO CRISIS",
        bgColor: "from-red-500/20 to-orange-500/20",
        textColor: "text-red-500"
    }
];

export default function AnimatedSequence() {
    const [currentSequence, setCurrentSequence] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSequence((prev) => (prev + 1) % sequences.length);
        }, 3000); // Change sequence every 3 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full aspect-[3/2] bg-neutral-900 rounded-3xl overflow-hidden border border-white/10">
            {/* Pulsing Background */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${sequences[currentSequence].bgColor}`}
                animate={{
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSequence}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center"
                >
                    {/* Icon */}
                    <motion.div
                        className="text-6xl mb-6"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {sequences[currentSequence].icon}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                        className={`text-2xl font-bold mb-2 ${sequences[currentSequence].textColor}`}
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {sequences[currentSequence].title}
                    </motion.h3>

                    {/* Description */}
                    <p className="text-white/60">
                        {sequences[currentSequence].description}
                    </p>

                    {/* Progress Dots */}
                    <div className="absolute bottom-6 flex gap-2">
                        {sequences.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                    index === currentSequence ? "bg-white" : "bg-white/20"
                                }`}
                                animate={index === currentSequence ? {
                                    scale: [1, 1.2, 1],
                                } : {}}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
