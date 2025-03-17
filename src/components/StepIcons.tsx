"use client";

import { motion } from "framer-motion";

interface StepIconProps {
    type: "record" | "analyze" | "alert";
}

export default function StepIcon({ type }: StepIconProps) {
    if (type === "record") {
        return (
            <div className="relative w-24 h-24 flex items-center justify-center">
                <motion.div 
                    className="absolute inset-0 bg-blue-400/10 rounded-full"
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div 
                    className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center relative z-10 overflow-hidden"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 2, 0, -2, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <motion.span 
                        className="text-4xl relative z-10"
                        animate={{
                            y: [0, -2, 0, 2, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        👨‍💻
                    </motion.span>
                    <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"
                        animate={{
                            width: ["0%", "100%", "0%"],
                            x: ["-100%", "0%", "100%"],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>
            </div>
        );
    }

    if (type === "analyze") {
        const waveVariants = {
            animate: {
                transition: {
                    staggerChildren: 0.1
                }
            }
        };

        const barVariants = {
            initial: { height: 5 },
            animate: { 
                height: [5, 20, 5, 15, 5],
                transition: {
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                }
            }
        };

        return (
            <div className="relative w-24 h-24 flex items-center justify-center">
                <motion.div 
                    className="absolute inset-0 bg-lime-400/10 rounded-full"
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div 
                    className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center relative z-10"
                    animate={{
                        scale: [1, 1.1, 1],
                        y: [0, -5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <motion.span 
                        className="text-4xl relative z-10"
                        animate={{
                            rotate: [0, 10, 0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        🤖
                    </motion.span>
                    
                    {/* AI Wave Animation */}
                    <motion.div 
                        className="absolute bottom-2 left-0 right-0 flex justify-center items-end gap-0.5 px-2"
                        variants={waveVariants}
                        animate="animate"
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-lime-400 rounded-full"
                                variants={barVariants}
                                initial="initial"
                                animate="animate"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative w-24 h-24 flex items-center justify-center">
            <motion.div 
                className="absolute inset-0 bg-orange-400/10 rounded-full"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div 
                className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center relative z-10"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                    scale: {
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "easeOut",
                    },
                    rotate: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }
                }}
            >
                <motion.span 
                    className="text-4xl relative z-10"
                    animate={{
                        scale: [1, 1.3, 1],
                        filter: ["drop-shadow(0 0 0px rgba(249, 115, 22, 0))", "drop-shadow(0 0 8px rgba(249, 115, 22, 0.8))", "drop-shadow(0 0 0px rgba(249, 115, 22, 0))"]
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        repeatDelay: 0.5
                    }}
                >
                    ⚡
                </motion.span>
                
                {/* Alert Ripple Effect */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 border-2 border-orange-400/30 rounded-2xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                            opacity: [0, 0.5, 0], 
                            scale: [0.8, 1.5, 1.8],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
