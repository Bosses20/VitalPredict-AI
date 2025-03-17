"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import designExample1Image from "@/assets/images/design-example-1.png";
import designExample2Image from "@/assets/images/design-example-2.png"; 
import Pointer from "@/components/Pointer";      
import { motion, useScroll, useTransform } from 'framer-motion';
import BlurText from "@/components/BlurText";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";

// Email validation schema
const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
    interests: z.array(z.string()).optional(),
});

type SubscribeFormData = z.infer<typeof schema>;

export default function Hero() {
    const { scrollYProgress } = useScroll();
    
    const designExampleOpacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.3],
        [1, 0.4, 0]
    );
    
    // Dragging state for mobile scroll experience
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const imagesRef = useRef<HTMLDivElement | null>(null);

    const [dragPositions, setDragPositions] = useState({
        left: 0,
        right: 0
    });

    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => setIsDragging(false);

    const handleDragLeft = (e: React.MouseEvent) => {
        const startX = e.clientX;
        const startLeft = dragPositions.left;
        handleDragStart();

        const handleMouseMove = (e: MouseEvent) => {
            const delta = e.clientX - startX;
            setDragPositions(prev => ({
                ...prev,
                left: Math.max(0, startLeft + delta)
            }));
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            handleDragEnd();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleDragRight = (e: React.MouseEvent) => {
        const startX = e.clientX;
        const startRight = dragPositions.right;
        handleDragStart();

        const handleMouseMove = (e: MouseEvent) => {
            const delta = e.clientX - startX;
            setDragPositions(prev => ({
                ...prev,
                right: Math.max(0, startRight - delta)
            }));
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            handleDragEnd();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showInterests, setShowInterests] = useState(false);
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SubscribeFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            interests: [],
        }
    });

    const onSubmit = async (data: SubscribeFormData) => {
        try {
            setIsSubmitting(true);
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                // Store the email in localStorage for later use (e.g., checkout process)
                localStorage.setItem('userEmail', data.email);
                
                toast.success(
                    <div>
                        <p>Thank you for subscribing!</p>
                        <p className="text-sm mt-1">Check out our early access offer below for 67% off!</p>
                    </div>,
                    { duration: 5000 }
                );
                reset();
                setShowInterests(false);
                
                // Optionally scroll to the pre-sale offer after successful signup
                setTimeout(() => {
                    document.getElementById('pre-sale-offer')?.scrollIntoView({ behavior: 'smooth' });
                }, 1500);
            } else {
                toast.error(result.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to submit. Please try again later.");
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="hero" className="relative pt-[100px] pb-20 lg:pb-32 lg:pt-[120px] overflow-visible">
            <div className="container relative">
                {/* Background draggable elements */}
                <div className="relative z-0">
                    <motion.div
                        className="absolute -left-[50%] top-16 transition-transform duration-300 cursor-pointer active:cursor-pointer hidden lg:block group"
                        style={{ 
                            transform: `translateX(${dragPositions.left}px)`,
                            x: isDragging ? undefined : 0
                        }}
                        drag="x"
                        dragConstraints={{ left: -100, right: 100 }}
                        dragElastic={0.1}
                        dragMomentum={false}
                        onDragEnd={() => {
                            setDragPositions(prev => ({ ...prev, left: 0 }));
                            handleDragEnd();
                        }}
                        whileTap={{ scale: 0.98 }}
                        onMouseDown={handleDragLeft}
                    >
                        <div className="cursor-pointer">
                            <Image 
                                src={designExample1Image} 
                                alt="Design example 1 image" 
                                width={500} 
                                height={300} 
                                className="rounded-lg shadow-xl cursor-pointer"
                            />
                            <div className="absolute right-0 top-1/2 translate-x-full hidden lg:block cursor-pointer group-hover:scale-110 transition-transform">
                                <Pointer name="Alex" color="blue"/>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        className="absolute -right-[50%] -top-16 transition-transform duration-300 cursor-pointer active:cursor-pointer hidden lg:block group"
                        style={{ 
                            transform: `translateX(-${dragPositions.right}px)`,
                            x: isDragging ? undefined : 0
                        }}
                        drag="x"
                        dragConstraints={{ left: -100, right: 100 }}
                        dragElastic={0.1}
                        dragMomentum={false}
                        onDragEnd={() => {
                            setDragPositions(prev => ({ ...prev, right: 0 }));
                            handleDragEnd();
                        }}
                        whileTap={{ scale: 0.98 }}
                        onMouseDown={handleDragRight}
                    >
                        <div className="cursor-pointer">
                            <Image 
                                src={designExample2Image} 
                                alt="Design example 2 image" 
                                width={500} 
                                height={300} 
                                className="rounded-lg shadow-xl cursor-pointer"
                            />
                            <div className="absolute left-0 top-1/2 -translate-x-full hidden lg:block cursor-pointer group-hover:scale-110 transition-transform">
                                <Pointer name="Bryan" color="red"/>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main content */}
                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <motion.div 
                            className="inline-flex py-1 px-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full text-neutral-950 font-semibold"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 400,
                                damping: 25
                            }}
                        > 
                            Join 1,532 Diabetics on the Waitlist 
                        </motion.div>
                    </div>

                    <div className="text-6xl md:text-7xl font-medium text-center mt-6">
                        <BlurText
                            text="Stop Living in Fear of Hypoglycemia Emergencies."
                            delay={100}
                            animateBy="words"
                            direction="top"
                            className="mb-4"
                            animationFrom={undefined}
                            animationTo={undefined}
                            onAnimationComplete={() => {}}
                        />
                        <BlurText
                            text="Get a 30 Minute Warning Before It&apos;s Too Late"
                            delay={120}
                            animateBy="words"
                            direction="bottom"
                            className="text-lime-400"
                            animationFrom={undefined}
                            animationTo={undefined}
                            onAnimationComplete={() => {}}
                        />
                    </div>

                    <motion.p
                        className="text-center text-xl text-white/50 mt-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            delay: 0.3
                        }}
                    >
                        VitalPredict AI analyzes your voice and glucose data to predict life-threatening lows before symptoms start-so you can act fast and stay safe
                    </motion.p>

                    <motion.form
                        className="flex border border-white/15 rounded-full p-2 mt-8 max-w-lg mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            delay: 0.4
                        }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="bg-transparent px-4 md:flex-1 w-full outline-none" 
                            disabled={isSubmitting}
                            {...register("email")}
                        />
                        <Button 
                            type="submit" 
                            variant="primary" 
                            className="whitespace-nowrap"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Sign Up"}
                        </Button>
                    </motion.form>
                    
                    {errors.email && (
                        <motion.p 
                            className="text-red-400 text-sm text-center mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {errors.email.message}
                        </motion.p>
                    )}
                    
                    {!showInterests ? (
                        <motion.p
                            className="text-center text-sm mt-2 text-white/60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <button 
                                type="button" 
                                className="text-lime-400 hover:text-lime-300 focus:outline-none"
                                onClick={() => setShowInterests(true)}
                            >
                                I'm interested in specific opportunities →
                            </button>
                        </motion.p>
                    ) : (
                        <motion.div
                            className="max-w-lg mx-auto mt-4 bg-white/5 p-4 rounded-xl"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-sm text-white/80 mb-3">I'm interested in: (select all that apply)</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <label className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer transition">
                                    <input 
                                        type="checkbox" 
                                        className="h-4 w-4 text-lime-400"
                                        value="subsidized_plans" 
                                        {...register("interests")}
                                    />
                                    <span className="text-sm text-white">Subsidized plans</span>
                                </label>
                                <label className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer transition">
                                    <input 
                                        type="checkbox" 
                                        className="h-4 w-4 text-lime-400"
                                        value="beta_testing" 
                                        {...register("interests")}
                                    />
                                    <span className="text-sm text-white">Beta testing</span>
                                </label>
                                <label className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer transition">
                                    <input 
                                        type="checkbox" 
                                        className="h-4 w-4 text-lime-400"
                                        value="launch_discounts" 
                                        {...register("interests")}
                                    />
                                    <span className="text-sm text-white">Launch discounts</span>
                                </label>
                            </div>
                            <p className="text-xs text-white/50">
                                Already in our <strong>1,532</strong> member waitlist? These selections will update your preferences.
                            </p>
                        </motion.div>
                    )}
                    
                    <motion.div
                        className="mt-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            delay: 0.6
                        }}
                    >
                        <a 
                            href="#pre-sale-offer" 
                            className="inline-flex items-center text-lime-400 hover:text-lime-300 font-medium transition-colors duration-200 text-sm md:text-base"
                        >
                            <span>Check out our limited time offer - 67% off for early access</span>
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </div>
            <Toaster position="bottom-center" />
        </section>
    );
}
