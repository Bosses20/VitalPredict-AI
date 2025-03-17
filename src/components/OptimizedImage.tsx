"use client";

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';

type OptimizedImageProps = {
  priority?: boolean;
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  mobileSizes?: string;
  desktopSizes?: string;
} & Omit<ImageProps, 'onLoad'>;

export default function OptimizedImage({
  priority = false,
  threshold = 0.1,
  rootMargin = '200px 0px',
  onLoad,
  mobileSizes = '100vw',
  desktopSizes = '50vw',
  ...props
}: OptimizedImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  
  // Use Intersection Observer for lazy loading
  useEffect(() => {
    // If priority is true, we don't need an observer
    if (priority) {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    const currentRef = imgRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [priority, threshold, rootMargin]);
  
  // Calculate responsive sizes based on screen size
  const sizes = `(max-width: 768px) ${mobileSizes}, ${desktopSizes}`;
  
  // Handle image load completion
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
    
    // Track image load performance
    if (window.performance && props.src) {
      const resourceName = typeof props.src === 'string' ? props.src : 'image-load';
      const loadTime = window.performance.now();
      
      // You could send this to your analytics if needed
      console.log(`Image loaded: ${resourceName} in ${Math.round(loadTime)}ms`);
    }
  };
  
  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${props.className || ''}`}
      style={{ 
        aspectRatio: props.width && props.height ? `${props.width} / ${props.height}` : 'auto',
        ...props.style 
      }}
    >
      {(isVisible || priority) && (
        <Image
          {...props}
          className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${props.className || ''}`}
          onLoad={handleImageLoad}
          loading={priority ? 'eager' : 'lazy'}
          sizes={sizes}
          // Add fetchPriority for better LCP
          fetchPriority={priority ? 'high' : 'auto'}
        />
      )}
    </div>
  );
}
