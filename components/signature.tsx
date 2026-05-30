"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export const Signature = () => {
  const [animationKey, setAnimationKey] = useState(0);

  const handleMouseEnter = () => {
    setAnimationKey((prev) => prev + 1);
  };

  // Precise segment definitions to reveal the letters one-by-one
  // H-r-u-s-h-a-b-h [Pause] K-a-l-e
  const maskSegments = [
    // --- "Hrushabh" ---
    { x: 0, w: 34, delay: 0.1, duration: 0.22 }, // H
    { x: 34, w: 18, delay: 0.32, duration: 0.12 }, // r
    { x: 52, w: 16, delay: 0.44, duration: 0.12 }, // u
    { x: 68, w: 16, delay: 0.56, duration: 0.12 }, // s
    { x: 84, w: 18, delay: 0.68, duration: 0.15 }, // h
    { x: 102, w: 16, delay: 0.83, duration: 0.12 }, // a
    { x: 118, w: 18, delay: 0.95, duration: 0.15 }, // b
    { x: 136, w: 18, delay: 1.1, duration: 0.15 }, // h

    // --- "Kale" (starts after a natural 0.25s hand-lift pause) ---
    { x: 154, w: 26, delay: 1.45, duration: 0.22 }, // K
    { x: 180, w: 16, delay: 1.67, duration: 0.12 }, // a
    { x: 196, w: 16, delay: 1.79, duration: 0.15 }, // l
    { x: 212, w: 38, delay: 1.94, duration: 0.18 }, // e + safety margin
  ];

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleMouseEnter}
      className="relative cursor-pointer select-none"
      title="Hover to sign again"
    >
      <svg
        key={animationKey}
        viewBox="0 0 250 80"
        className="h-[80px] w-[250px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id={`signature-mask-${animationKey}`}>
            {/* Dark background hides everything */}
            <rect x="0" y="0" width="250" height="80" fill="black" />

            {/* Letter-by-letter sequential reveal blocks */}
            {maskSegments.map((seg, idx) => (
              <motion.rect
                key={idx}
                x={seg.x}
                y={0}
                height={80} // Full height ensures absolutely no top/bottom clipping
                fill="white"
                initial={{ width: 0 }}
                animate={{ width: seg.w }}
                transition={{
                  duration: seg.duration,
                  ease: "linear", // Linear reveals letters at a steady pen speed
                  delay: seg.delay,
                }}
              />
            ))}
          </mask>
        </defs>

        {/* Bolder cursive text with Corinthia weight 700 */}
        <text
          x="15"
          y="50"
          fill="currentColor"
          style={{ fontFamily: "var(--font-corinthia)", fontWeight: 700 }}
          className="text-foreground/75 text-4xl select-none"
          mask={`url(#signature-mask-${animationKey})`}
        >
          Hrushabh Kale
        </text>

        {/* Calligraphic Underline Flourish - sweeps elegantly under the signature from left to right */}
        <motion.path
          d="M 20,62 Q 125,70 230,60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5" // Bolder stroke to match the bolder text
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/45 dark:text-foreground/35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.9,
            ease: [0.25, 0.1, 0.25, 1], // Smooth draw easing
            delay: 2.15, // Draws immediately after "e" finishes
          }}
        />
      </svg>
    </div>
  );
};
