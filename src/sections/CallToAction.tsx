"use client";

import { motion, useAnimate, AnimationPlaybackControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function CallToAction() {
    const animation = useRef<AnimationPlaybackControls>();
    const [scope, animate] = useAnimate();
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        
        try {
            setIsLoading(true);
            // Call the checkout API endpoint
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Emergency Protection User',
                    customData: {
                        source: 'emergency_cta'
                    }
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
                    {Array.from({ length: 3 }).map((_, index) => (
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
                            </div>
                        </div>  
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
