"use client";

import React, { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Parse numeric part and prefix/suffix from input value e.g. "12+" => prefix="", target=12, suffix="+"
  const match = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const numericTarget = match ? parseFloat(match[2].replace(/,/g, "")) : 0;
  const suffix = match ? match[3] : value;
  const isDecimal = match ? match[2].includes(".") : false;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          if (isNaN(numericTarget) || numericTarget === 0) {
            setDisplayValue(value);
            return;
          }

          const duration = 1500; // ms
          const startTime = performance.now();

          const updateCount = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic function for ultra smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = numericTarget * easeProgress;

            if (isDecimal) {
              setDisplayValue(`${prefix}${currentNum.toFixed(1)}${suffix}`);
            } else {
              setDisplayValue(`${prefix}${Math.floor(currentNum)}${suffix}`);
            }

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated, numericTarget, prefix, suffix, isDecimal]);

  return (
    <span ref={elementRef} className={className}>
      {hasAnimated ? displayValue : `${prefix}0${suffix}`}
    </span>
  );
}
