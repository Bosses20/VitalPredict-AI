"use client";

import { useEffect, useState, useCallback, memo } from "react";
import Countdown from "react-countdown";
import { motion } from "framer-motion";
import PurchaseButton from "@/components/PurchaseButton";
import TrustBadges from "@/components/TrustBadges";
import Tag from "@/components/Tag";
import { AvatarCircles } from "@/registry/magicui/avatar-circles";

// Define the missing CountdownRenderProps type
interface CountdownRenderProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
}

const getDefaultEndTime = () => {
    // Set end time to 12 minutes and 34 seconds from now for demo
    return Date.now() + (12 * 60 + 34) * 1000;
};

const FeatureCheckmark = memo(() => (
    <div className="w-5 h-5 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <svg className="w-3.5 h-3.5 text-lime-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    </div>
));
FeatureCheckmark.displayName = 'FeatureCheckmark';

const FeatureItem = memo(({ children }: { children: React.ReactNode }) => (
    <motion.div 
        className="flex items-center gap-3 text-white/90"
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        role="listitem"
    >
        <FeatureCheckmark />
        <span className="text-sm md:text-base">{children}</span>
    </motion.div>
));
FeatureItem.displayName = 'FeatureItem';

const CountdownRenderer = ({ hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
        return <span>Offer expired</span>;
    }

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-neutral-200">Countdown Timer:</span>
            <p className="text-lg text-lime-400">
                ⏳ {formattedTime} left at this price!
            </p>
        </div>
    );
};

const UserAvatars = memo(() => {
    const avatars = [
        {
            imageUrl: "https://avatars.githubusercontent.com/u/16860528",
            profileUrl: "https://github.com/dillionverma"
        },
        {
            imageUrl: "https://avatars.githubusercontent.com/u/20110627",
            profileUrl: "https://github.com/tomonarifeehan"
        },
        {
            imageUrl: "https://avatars.githubusercontent.com/u/106103625",
            profileUrl: "https://github.com/BankkRoll"
        },
        {
            imageUrl: "https://avatars.githubusercontent.com/u/59228569",
            profileUrl: "https://github.com/safethecode"
        },
        {
            imageUrl: "https://avatars.githubusercontent.com/u/59442788",
            profileUrl: "https://github.com/sanjay-mali"
        }
    ];

    return <AvatarCircles numPeople={82} avatarUrls={avatars} />;
});
UserAvatars.displayName = 'UserAvatars';

export default function PreSaleOffer() {
    const [endTime, setEndTime] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isClaimed, setIsClaimed] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isSubmitting, setIsSubmitting] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null);
    const totalSpots = 100;
    const claimedCount = 82; // Update this dynamically if needed
    const claimedPercentage = (claimedCount / totalSpots) * 100;
    
    // Initialize the countdown timer
    useEffect(() => {
        const savedEndTime = localStorage.getItem('offerEndTime');
        
        if (savedEndTime) {
            const parsedEndTime = parseInt(savedEndTime, 10);
            
            // If the saved time is in the past, create a new one
            if (parsedEndTime < Date.now()) {
                const newEndTime = getDefaultEndTime();
                localStorage.setItem('offerEndTime', newEndTime.toString());
                setEndTime(newEndTime);
            } else {
                setEndTime(parsedEndTime);
            }
        } else {
            const newEndTime = getDefaultEndTime();
            localStorage.setItem('offerEndTime', newEndTime.toString());
            setEndTime(newEndTime);
        }
    }, []);
    
    // Get email from localStorage
    const getUserEmail = useCallback(() => {
        return localStorage.getItem('userEmail') || 'test@example.com';
    }, []);

    if (!endTime) return null;
    
    return (
        <section id="pre-sale-offer" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-purple-400/5 opacity-10" />
            <div className="absolute -inset-x-32 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/20 to-transparent" />
            <div className="absolute -inset-x-32 bottom-0 h-px bg-gradient-to-r from-transparent via-lime-400/20 to-transparent" />
            
            <div className="max-w-4xl mx-auto px-4 relative">
                <motion.div 
                    className="relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 overflow-hidden"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-lime-400/10 to-transparent opacity-20" />
                    
                    <div className="relative p-6 md:p-8 lg:p-10">
                        <div className="text-center mb-8">
                            <Tag className="mb-4">EARLY ACCESS OFFER</Tag>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                <span className="text-lime-400">Lifetime Access</span> at 67% Off
                            </h2>
                            
                            {/* Price Display */}
                            <div className="inline-flex items-center justify-center gap-4 bg-white/5 rounded-xl px-5 py-2 mb-6">
                                <span className="text-neutral-300 text-xl line-through font-medium">$600</span>
                                <div className="w-px h-8 bg-white/15" />
                                <span className="text-3xl font-bold text-lime-400">$200</span>
                                <div className="bg-lime-400/20 px-2 py-1 rounded-full text-xs text-lime-400 font-medium">
                                    67% OFF
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="mb-6 space-y-3 max-w-md mx-auto">
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-lime-400"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${claimedPercentage}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        role="progressbar"
                                        aria-valuenow={claimedPercentage}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label="Spots claimed progress"
                                    />
                                </div>
                                <div className="flex justify-between text-sm text-neutral-300">
                                    <span className="font-medium">{totalSpots - claimedCount} spots remaining</span>
                                    <Countdown
                                        date={endTime}
                                        renderer={CountdownRenderer}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Two Column Layout for Features and Benefits */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
                            {/* Left Column: Key Features */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white mb-2">What You Get:</h3>
                                <div className="space-y-3">
                                    <FeatureItem>Priority support & updates</FeatureItem>
                                    <FeatureItem>Sleep Safety Mode ($200 value)</FeatureItem>
                                    <FeatureItem>Lifetime access to all features</FeatureItem>
                                    <FeatureItem>100% money-back guarantee</FeatureItem>
                                </div>
                            </div>
                            
                            {/* Right Column: Value Proposition */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Why It&apos;s Worth It:</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-lime-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-neutral-200"><strong className="text-white">One-Time Cost:</strong> Vs. $30/month after launch</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-lime-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-neutral-200"><strong className="text-white">Prevention:</strong> Fraction of the cost of one ER visit</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-lime-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-neutral-200"><strong className="text-white">Peace of Mind:</strong> 24/7 protection for you and your family</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center max-w-md mx-auto mb-6">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <PurchaseButton 
                                    email={getUserEmail()}
                                    label="Secure Your Lifetime Access →"
                                    className="w-full mb-4 text-lg h-12"
                                    fullWidth={true}
                                    customData={{
                                        source: 'early_access_offer',
                                    }}
                                />
                            </motion.div>
                            
                            {/* Trust Badges */}
                            <TrustBadges className="mb-4" />
                            
                            {/* Guarantee Info */}
                            <div className="flex flex-col gap-2 text-sm text-neutral-300">
                                <p className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Risk-free guarantee: 100% refund if you&apos;re unsatisfied
                                </p>
                            </div>
                            
                            {/* Recent Buyers */}
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <UserAvatars />
                                <span className="text-xs text-neutral-400">Last claimed 47 minutes ago</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
