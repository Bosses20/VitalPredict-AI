"use client";

import dexcomLogo from "@/assets/images/dexcom.svg";
import libreViewLogo from "@/assets/images/libreview.svg";
import johnsHopkinsLogo from "@/assets/images/Johns_Hopkins.svg";
import mayoclinicLogo from "@/assets/images/mayo_clinic.svg";
import HIPAALogo from "@/assets/images/HIPAA.svg";
import GDPRLogo from "@/assets/images/GDPR.svg";
import Image from "next/image";
import { motion, useAnimation, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

const logos = [
    { name: "Dexcom", image: dexcomLogo },
    { name: "LibreView", image: libreViewLogo },
    { name: "Johns Hopkins", image: johnsHopkinsLogo },
    { name: "Mayo Clinic", image: mayoclinicLogo },
    { name: "HIPAA", image: HIPAALogo },
    { name: "GDPR", image: GDPRLogo }
];

export default function LogoTicker() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    
    // Slow down logos when user is viewing this section
    const velocity = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [1, 0.5, 1]
    );
    
    const controls = useAnimation();
    
    // Start the animation sequence
    useEffect(() => {
        controls.start({
            x: ["0%", "-50%"],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                    // Use velocity to modulate the animation speed
                    timeScale: velocity.get()
                }
            }
        });
        
        // Update animation speed when scrolling through the section
        const unsubscribe = velocity.onChange(v => {
            controls.timeScale = v;
        });
        
        return () => {
            unsubscribe();
        };
    }, [controls, velocity]);
    
    return (
        <section className="py-24 overflow-hidden" ref={containerRef}>
            <div className="container">
                <h3 className="text-center text-white/50 text-xl mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.6,
                            delay: 0.2
                        }}
                        viewport={{ once: true }}
                    >
                        Trusted by Leading Healthcare Innovators
                    </motion.span>
                </h3>
                
                <div className="relative">
                    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <motion.div 
                            className="flex min-w-max items-center justify-start gap-24 px-6"
                            animate={controls}
                            whileHover={{ 
                                animationPlayState: "paused", 
                                transition: { duration: 0.2 } 
                            }}
                        >
                            {[...logos, ...logos, ...logos].map((logo, index) => (
                                <motion.div 
                                    key={`${logo.name}-${index}`}
                                    className={`relative ${logo.name === "Johns Hopkins" ? "w-40 h-16" : "w-32 h-12"} mx-12`}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Image 
                                        src={logo.image} 
                                        alt={logo.name}
                                        fill
                                        className="object-contain brightness-0 invert transition-all duration-300"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
