// Performance optimization utilities
import { useEffect } from 'react';

// Function to preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;
  
  // Preload critical images
  const criticalImages = [
    '/images/hero-bg.webp',
    '/images/logo.svg',
    '/images/voice-wave.svg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Function to defer non-critical resources
export const deferNonCriticalResources = () => {
  if (typeof window === 'undefined') return;
  
  // CSS that's not critical for first paint
  setTimeout(() => {
    const nonCriticalCSS = [
      // Add paths to non-critical CSS here
    ];
    
    nonCriticalCSS.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      document.head.appendChild(link);
    });
  }, 0);
};

// Component that implements performance optimizations
export const usePerformanceOptimizations = () => {
  useEffect(() => {
    // Implement performance optimizations
    preloadCriticalResources();
    deferNonCriticalResources();
    
    // Track performance metrics
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Record navigation timing
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          const domLoadTime = perfData.domComplete - perfData.domLoading;
          
          console.log('Performance metrics:', {
            pageLoadTime,
            domLoadTime,
            // Add more metrics as needed
          });
          
          // Could be sent to analytics
        }, 0);
      });
    }
  }, []);
};

// Load polyfills only when needed
export const loadPolyfills = async () => {
  if (typeof window === 'undefined') return;
  
  const needsIntersectionObserverPolyfill = !('IntersectionObserver' in window);
  const needsCustomEventPolyfill = !('CustomEvent' in window);
  
  if (needsIntersectionObserverPolyfill) {
    await import('intersection-observer');
  }
  
  if (needsCustomEventPolyfill) {
    await import('custom-event-polyfill');
  }
};
