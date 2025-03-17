"use client";

import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface TestimonialProps {
    name: string;
    handle: string;
    content: string;
    avatar: string;
}

const testimonials = [
    {
        name: "Ryan Thompson",
        handle: "@ryan_t1d",
        avatar: "https://avatars.githubusercontent.com/u/4824312",
        content: "I grabbed the $200 deal because it's cheaper than one night in the ER. Already got alerts that saved me twice! Best investment for my health."
    },
    {
        name: "Emma Davis",
        handle: "@emma_diabetic",
        avatar: "https://avatars.githubusercontent.com/u/16860528",
        content: "VitalPredict AI is a solution that understands our daily struggles. The analysis caught my low blood sugar before I did! ✨"
    },
    {
        name: "Dr. Sarah Chen",
        handle: "@diabetesdoc",
        avatar: "https://avatars.githubusercontent.com/u/20110627",
        content: "As an endocrinologist, I'm impressed by VitalPredict's early warning system. It's a game-changer for my patients."
    },
    {
        name: "James Wilson",
        handle: "@james_w",
        avatar: "https://avatars.githubusercontent.com/u/106103625",
        content: "The smart alerts have helped me maintain better control. My A1C has never been better! 📊"
    },
    {
        name: "Lisa Rodriguez",
        handle: "@lisa_r",
        avatar: "https://avatars.githubusercontent.com/u/59228569",
        content: "Being able to share my data with my doctor in real-time has revolutionized my diabetes management."
    },
    {
        name: "David Kim",
        handle: "@david_k",
        avatar: "https://avatars.githubusercontent.com/u/59442788",
        content: "The predictive analytics caught patterns I never noticed before. It's like having a personal diabetes expert 24/7 😊"
    }
];

const Testimonial = ({ name, handle, content, avatar }: TestimonialProps) => {
    return (
        <div className="min-w-[300px] px-3">
            <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="relative w-10 h-10">
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-white/0 z-10" />
                            <Image
                                src={avatar}
                                alt={`${name}'s avatar`}
                                className="rounded-xl shadow-lg ring-2 ring-white/10"
                                width={40}
                                height={40}
                                unoptimized
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-medium leading-tight">{name}</span>
                            <span className="text-neutral-400 text-xs">{handle}</span>
                        </div>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">{content}</p>
                </div>
            </div>
        </div>
    );
};

export default function WhatPeopleAreSaying() {
    const controls = useAnimationControls();
    const hasAnimated = useRef(false);

    // Double the testimonials array for seamless looping
    const doubledTestimonials = [...testimonials, ...testimonials];

    const handleViewportEnter = () => {
        controls.start({
            x: -testimonials.length * 320,
            transition: {
                duration: 40,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
            }
        });
        hasAnimated.current = true;
    };

    return (
        <section className="py-24 relative z-20" id="testimonials">
            <div className="container">
                <div className="text-center mb-16">
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold mb-6" 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        What People Are Saying
                    </motion.h2>

                    <motion.p
                        className="text-white/60 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Here&apos;s what our early users are saying about VitalPredict AI.
                    </motion.p>
                </div>
                
                <motion.div 
                    className="flex gap-4 py-4"
                    initial={{ x: 0 }}
                    animate={controls}
                    onViewportEnter={() => {
                        if (!hasAnimated.current) {
                            handleViewportEnter();
                        }
                    }}
                >
                    {doubledTestimonials.map((testimonial, index) => (
                        <Testimonial key={index} {...testimonial} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
