"use client";

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';

type OptimizedImageProps = {
  priority?: boolean;
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
} & Omit<ImageProps, 'onLoad'>;

export default function OptimizedImage({
  priority = false,
  threshold = 0.1,
  rootMargin = '200px 0px',
  onLoad,
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
  }, [priority, rootMargin, threshold]);
  
  // Handle image load completion
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div ref={imgRef} className="relative">
      {(priority || isVisible) ? (
        <>
          <Image
            {...props}
            priority={priority}
            onLoad={handleLoad}
            style={{
              ...props.style,
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
          {!isLoaded && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-zinc-900/10 to-zinc-800/10 animate-pulse"
              style={{
                width: props.width,
                height: props.height,
              }}
            />
          )}
        </>
      ) : (
        <div 
          className="bg-neutral-800/50"
          style={{
            width: props.width,
            height: props.height,
          }}
        />
      )}
    </div>
  );
}
