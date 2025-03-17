"use client";

import logoImage from "@/assets/images/logo.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#testimonials", label: "Reviews" },
    { href: "/#faqs", label: "FAQs" },
    { href: "/privacy", label: "Privacy Policy", isExternal: true },
    { href: "/terms", label: "Terms of Service", isExternal: true }
];

const LockIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className="text-lime-400"
    >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <footer role="contentinfo" className="py-8 md:py-16 bg-gradient-to-t from-black/20 to-transparent">
            <div className="container max-w-6xl mx-auto px-4 md:px-6">
                <motion.div 
                    className="flex flex-col gap-8 md:gap-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {/* Brand and Navigation */}
                    <motion.div className="flex flex-col gap-6 md:gap-8" variants={itemVariants}>
                        <motion.div 
                            className="flex justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link href="/#hero">
                                <Image 
                                    src={logoImage} 
                                    alt="VitalPredict AI logo" 
                                    className="h-8 md:h-10 w-auto transition-transform duration-300"
                                />
                            </Link>
                        </motion.div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
                            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-8 px-4">
                                {footerLinks.map((link, index) => (
                                    link.isExternal ? (
                                        <motion.div key={index} variants={itemVariants}>
                                            <Link
                                                href={link.href}
                                                className="text-white/60 hover:text-lime-300 transition-colors duration-200 hover:underline underline-offset-4 font-medium text-sm md:text-base"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                        >
                                            <Link
                                                href={link.href}
                                                className="text-white/60 hover:text-lime-300 transition-colors duration-200 hover:underline underline-offset-4 font-medium text-sm md:text-base"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    )
                                ))}
                            </nav>
                        </div>
                    </motion.div>

                    {/* Trust Signals */}
                    <motion.div className="flex flex-col items-center gap-6 md:gap-8 text-center" variants={itemVariants}>
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                            <LockIcon />
                            <p>HIPAA & GDPR Compliant</p>
                        </div>

                        <p className="text-sm text-white/40">
                            © {currentYear} VitalPredict AI. All rights reserved.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
}
