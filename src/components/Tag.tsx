"use client";

import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export default function Tag(props: HTMLAttributes<HTMLDivElement>) {
    const { className, children, ...otherProps } = props;
    
    return (
        <motion.div 
            className={twMerge(
                "inline-flex border border-lime-400 gap-2 text-lime-400 px-3 py-1 rounded-full uppercase items-center", 
                className
            )} 
            {...otherProps}
            whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 8px rgba(163, 230, 53, 0.5)",
                transition: { duration: 0.2 }
            }}
        >
            <motion.span
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >&#10038;</motion.span>
            <motion.span 
                className="text-sm"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >{children}</motion.span>
        </motion.div>
    );
}