"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LogoImage from "@/assets/images/logo.svg";
import Button from "@/components/Button";
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";

interface DropdownItem {
    label: string;
    href: string;
}

interface NavLink {
    label: string;
    href: string;
    dropdown?: DropdownItem[];
}

const navLinks: NavLink[] = [
    { label: "Home", href: "/#hero" },
    { label: "Features", href: "/#features" },
    { 
        label: "How", 
        href: "/#how-it-works",
        dropdown: [
            { label: "Overview", href: "/#how-it-works" },
            { label: "Detailed Guide", href: "/how-it-works" }
        ]
    },
    { label: "Reviews", href: "/#testimonials" },
    { label: "FAQs", href: "/#faqs" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Close mobile menu when window is resized to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isOpen) {
                setIsOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);
    
    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
            }
        };
    }, []);
    
    const handleDropdownEnter = (index: number) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
            dropdownTimeoutRef.current = null;
        }
        setActiveDropdown(index);
    };
    
    const handleDropdownLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 300); // 300ms delay before closing
    };

    const handleEarlyAccessClick = async () => {
        try {
            setIsLoading(true);
            // Call the checkout API endpoint
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: 'lifetime_access',
                }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create checkout');
            }
            
            // Redirect to the checkout URL
            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else {
                throw new Error('Invalid checkout response');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            // Handle error here (could show a toast or alert)
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-4 px-4">
            <div className="container max-w-6xl mx-auto">
                {/* Pill-shaped navbar with glass effect */}
                <div className="bg-black/30 backdrop-blur-xl rounded-full border border-white/10 py-2 px-4 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/#hero">
                            <Image src={LogoImage} alt="VitalPredict.ai logo" className="h-9 w-auto transition-transform duration-[250ms] hover:scale-105"/> 
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex justify-center items-center flex-grow">
                        <nav className="flex gap-6 text-sm font-medium">
                            {navLinks.map((link, index) => (
                                <div key={link.label} className="relative">
                                    {link.dropdown ? (
                                        <>
                                            <button 
                                                className="flex items-center gap-1 hover:text-lime-400 transition-all duration-[250ms] hover:scale-105 py-2"
                                                onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                                onMouseEnter={() => handleDropdownEnter(index)}
                                                onMouseLeave={handleDropdownLeave}
                                                aria-expanded={activeDropdown === index}
                                                aria-haspopup="true"
                                            >
                                                {link.label}
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
                                                    className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`}
                                                >
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </button>
                                            {activeDropdown === index && (
                                                <div 
                                                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 p-2 min-w-[180px] shadow-lg z-10"
                                                    onMouseEnter={() => handleDropdownEnter(index)}
                                                    onMouseLeave={handleDropdownLeave}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4">
                                                        <div className="w-4 h-4 bg-black/80 backdrop-blur-xl rotate-45 border-t border-l border-white/10"></div>
                                                    </div>
                                                    {link.dropdown.map((item) => (
                                                        <Link 
                                                            key={item.label}
                                                            href={item.href} 
                                                            className="block py-3 px-4 hover:bg-white/10 rounded-lg hover:text-lime-400 transition-all duration-150 text-center"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link 
                                            href={link.href} 
                                            className="hover:text-lime-400 transition-all duration-[250ms] hover:scale-105 py-2 block"
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                    
                    {/* Right Side - Menu Button and CTA */}
                    <div className="flex items-center gap-4">
                        {/* Hamburger Menu Button - Mobile Only */}
                        <motion.button
                            className="lg:hidden flex items-center justify-center"
                            onClick={() => setIsOpen(!isOpen)}
                            whileHover={{ scale: 1.1 }}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                            aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <motion.line
                                    x1="3" y1="6" x2="21" y2="6"
                                    animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.line
                                    x1="3" y1="12" x2="21" y2="12"
                                    animate={{ opacity: isOpen ? 0 : 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.line
                                    x1="3" y1="18" x2="21" y2="18"
                                    animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </svg>
                        </motion.button>
                        
                        {/* CTA Button */}
                        <Button 
                            variant="primary" 
                            className="hidden md:inline-flex items-center text-sm transition-all duration-[250ms] hover:scale-105 px-5 py-2 rounded-full"
                            onClick={handleEarlyAccessClick}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Early Access'}
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-menu"
                        className="fixed left-0 right-0 top-0 bottom-0 z-[60] pt-20 pb-6 px-4 bg-black/70 backdrop-blur-xl overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="max-w-md mx-auto bg-neutral-900/80 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            <div className="flex justify-between items-center mb-6">
                                <Link href="/#hero" onClick={() => setIsOpen(false)}>
                                    <Image src={LogoImage} alt="VitalPredict.ai logo" className="h-8 w-auto object-contain"/> 
                                </Link>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-white transition-colors"
                                    aria-label="Close mobile menu"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                            <nav role="navigation" aria-label="Mobile menu" className="flex flex-col items-center space-y-6">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.label}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="w-full"
                                    >
                                        {link.dropdown ? (
                                            <div className="w-full">
                                                <button
                                                    className="text-xl font-medium hover:text-lime-400 text-center w-full py-3 flex items-center justify-center gap-2"
                                                    onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                                    aria-expanded={activeDropdown === index}
                                                    aria-haspopup="true"
                                                >
                                                    {link.label}
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        width="20" 
                                                        height="20" 
                                                        viewBox="0 0 24 24" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeWidth="2"
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round"
                                                        className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`}
                                                    >
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </button>
                                                
                                                <AnimatePresence>
                                                    {activeDropdown === index && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="bg-white/5 rounded-xl mt-2 mb-2 py-2 px-1">
                                                                {link.dropdown.map((item) => (
                                                                    <Link
                                                                        key={item.label}
                                                                        href={item.href}
                                                                        className="text-lg font-medium hover:text-lime-400 text-center w-full py-3 block rounded-lg hover:bg-white/5 transition-colors"
                                                                        onClick={() => {
                                                                            setActiveDropdown(null);
                                                                            setIsOpen(false);
                                                                        }}
                                                                    >
                                                                        {item.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-xl font-medium hover:text-lime-400 text-center w-full py-3 block"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                                <motion.div
                                    className="flex flex-col items-center gap-3 w-full pt-4"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: navLinks.length * 0.1 + 0.1 }}
                                >
                                    <Button
                                        variant="primary"
                                        className="w-full text-center py-3 rounded-full"
                                        onClick={() => {
                                            setIsOpen(false);
                                            handleEarlyAccessClick();
                                        }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Loading...' : 'Get Early Access'}
                                    </Button>
                                </motion.div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
