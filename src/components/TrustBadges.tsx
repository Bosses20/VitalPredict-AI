export default function TrustBadges() {
    return (
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
                <svg className="w-4 h-4 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-neutral-300">256-bit SSL Security</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
                <svg className="w-4 h-4 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-neutral-300">100% Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
                <svg className="w-4 h-4 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-neutral-300">Money-back Guarantee</span>
            </div>
        </div>
    );
}
