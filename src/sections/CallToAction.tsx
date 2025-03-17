"use client";

import { motion, useAnimate, AnimationPlaybackControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function CallToAction() {
    const animation = useRef<AnimationPlaybackControls>();
    const [scope, animate] = useAnimate();
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        const el = scope.current;
        if (el) {
            animation.current = animate(el, {
                x: '-50%'
            }, {
                duration: 30,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop'
            });
        }
        
        return () => {
            if (animation.current) {
                animation.current.stop();
            }
        };
    }, [animate, scope]); 

    // Effect to handle animation speed changes on hover
    useEffect(() => {
        if (animation.current) {
            animation.current.speed = isHovered ? 0.5 : 1;
        }
    }, [isHovered, animation]); 

    const handleCheckoutClick = async () => {
        if (isLoading) return;
        
        // Validate email
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        
        try {
            setIsLoading(true);
            setEmailError('');
            // Call the checkout API endpoint
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Emergency Protection User',
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Redirect to Stripe checkout
            window.location.href = data.checkoutUrl;
        } catch (error) {
            console.error('Error starting checkout:', error);
            alert('Sorry, there was a problem starting the checkout process. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="cta" className="py-24">
            <div className="overflow-x-clip p-4 flex">
                <motion.div 
                    ref={scope}
                    className={`flex flex-none gap-16 text-7xl md:text-8xl font-medium ${isLoading ? 'opacity-70 cursor-wait' : 'cursor-pointer hover:text-lime-50'}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleCheckoutClick}
                >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-16">
                            <span className="text-lime-400 text-7xl self-start mt-4">&#10038;</span> 
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <h2 className="text-5xl md:text-6xl font-bold mb-6 text-center">
                                        Don&apos;t live in fear of hypos
                                    </h2>
                                    <span className="text-5xl md:text-6xl font-bold">Could Be Your Last.</span>
                                </div>
                                <span className="text-4xl md:text-5xl text-lime-400 font-medium">
                                    {isLoading ? 'Loading Checkout...' : 'Get Protected Now-Before It\'s Too Late'}
                                </span>
                                <div className="mt-6 flex flex-col md:flex-row gap-3 max-w-md mx-auto">
                                    <div className="flex-1">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email address"
                                            className="w-full px-4 py-3 bg-black/30 border border-lime-400/30 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-lime-400/50"
                                            disabled={isLoading}
                                        />
                                        {emailError && (
                                            <p className="mt-1 text-red-500 text-sm">{emailError}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleCheckoutClick}
                                        disabled={isLoading}
                                        className="bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-6 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {isLoading ? 'Processing...' : 'Get Protected'}
                                    </button>
                                </div>
                            </div>
                        </div>  
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
