"use client";

import { useEffect, ReactNode, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import * as analytics from '@/lib/analytics';
import { usePerformanceOptimizations, loadPolyfills } from '@/lib/performance';

interface AnalyticsProviderProps {
  children: ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [analyticsInitialized, setAnalyticsInitialized] = useState(false);

  // Apply performance optimizations
  usePerformanceOptimizations();

  // Initialize analytics and load polyfills on first render
  useEffect(() => {
    const initialize = async () => {
      try {
        await loadPolyfills();
        const initialized = analytics.initGA();
        setAnalyticsInitialized(initialized);
        
        // Debug logging in development mode
        if (process.env.NODE_ENV === 'development') {
          const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
          console.log(`[Analytics] Initializing with Measurement ID: ${measurementId || 'NOT SET'}`);
          console.log(`[Analytics] Initialization ${initialized ? 'successful' : 'failed'}`);
        }
      } catch (error) {
        console.error('[Analytics] Initialization error:', error);
      }
    };
    
    initialize();
  }, []);

  // Track page views when the route changes
  useEffect(() => {
    if (!analyticsInitialized) return;
    
    // Create URL with path and search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Track page view
    analytics.pageview(url);
    
    // Debug logging in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Page view tracked: ${url}`);
    }
  }, [pathname, searchParams, analyticsInitialized]);

  return <>{children}</>;
}
