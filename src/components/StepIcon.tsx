"use client";

import { motion } from "framer-motion";

interface StepIconProps {
    type: "record" | "analyze" | "alert";
}

export default function StepIcon({ type }: StepIconProps) {
    if (type === "record") {
        return (
            <div className="relative w-20 h-20">
                {/* Pulsing Background */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Voice Waveform */}
                <div className="absolute inset-0 flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 bg-blue-400"
                            animate={{
                                height: ["20%", "80%", "20%"],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                            style={{
                                borderRadius: 4,
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (type === "analyze") {
        return (
            <div className="relative w-20 h-20">
                {/* Scanning Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-400/20 to-transparent"
                    animate={{
                        y: [-80, 80, -80],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Data Points */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-2">
                        {[...Array(9)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-lime-400 rounded-full"
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-20 h-20">
            {/* Alert Pulse */}
            <motion.div
                className="absolute inset-0 bg-red-500/20 rounded-full"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            />

            {/* Alert Symbol */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                }}
            >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center transform rotate-45">
                    <motion.div
                        animate={{
                            opacity: [1, 0.5, 1],
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                        }}
                        className="text-white font-bold text-2xl transform -rotate-45"
                    >
                        !
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
