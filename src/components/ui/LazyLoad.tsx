"use client";

import { useEffect, useRef, useState, ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
}

export function LazyLoad({ children, threshold = 0.1, className }: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : <div className="h-full w-full animate-pulse bg-gray-100 rounded-md" style={{ minHeight: '400px' }} />}
    </div>
  );
}
