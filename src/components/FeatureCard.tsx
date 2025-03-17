"use client";

import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export default function FeatureCard(props: { 
    title: string;
    description: string; 
    children?: React.ReactNode;
    className?: string; 
    index?: number;
}) {
    const { title, description, children, className, index = 0 } = props;
    
    return (
        <motion.div 
            className={twMerge("bg-neutral-900 border border-white/10 p-6 rounded-3xl overflow-hidden", className)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
                duration: 0.7, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 50
            }}
            whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 }
            }}
        >
            <motion.div 
                className="aspect-video"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ 
                    duration: 0.5, 
                    delay: 0.2 + index * 0.2,
                }}
            >
                {children}
            </motion.div>
            
            <div>
                <motion.h3 
                    className="text-3xl font-medium mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ 
                        duration: 0.5, 
                        delay: 0.3 + index * 0.2,
                    }}
                >
                    {title}
                </motion.h3>
                
                <motion.p 
                    className="text-white/50 mt-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ 
                        duration: 0.5, 
                        delay: 0.4 + index * 0.2,
                    }}
                >
                    {description}
                </motion.p>
            </div>
        </motion.div>
    );
}