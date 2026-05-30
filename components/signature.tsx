"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export const Signature = () => {
  const [animationKey, setAnimationKey] = useState(0);

  const handleMouseEnter = () => {
    setAnimationKey((prev) => prev + 1);
  };

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
            {/* Everything white is visible, everything black is hidden */}
            <rect x="0" y="0" width="250" height="80" fill="black" />

            {/* High-fidelity Traversing Mask Path for "Hrushabh" */}
            <motion.path
              d="M 25,25 C 18,35 15,48 20,50 C 26,52 32,30 35,22 C 34,35 30,48 35,50 C 38,50 38,40 46,42 C 50,40 52,50 58,46 C 62,50 68,42 70,50 C 76,46 80,42 78,50 C 84,48 92,22 90,50 C 95,42 98,50 104,46 C 100,48 108,44 110,50 C 116,46 124,22 122,50 C 128,44 134,46 142,22 C 140,50 146,42 148,50 C 153,49 155,47 158,48"
              fill="none"
              stroke="white"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.6,
                ease: [0.25, 0.1, 0.25, 1], // Cursive drawing ease
                delay: 0.1,
              }}
            />

            {/* High-fidelity Traversing Mask Path for "Kale" */}
            <motion.path
              d="M 145,22 C 140,35 135,48 138,52 C 142,54 155,35 158,32 C 155,36 145,40 152,40 C 158,40 155,48 165,52 C 175,48 170,50 185,52 C 195,46 208,22 212,46 C 222,42 230,50 230,50"
              fill="none"
              stroke="white"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.0,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 1.7, // Follows Hrushabh with a tiny overlap
              }}
            />
          </mask>
        </defs>

        {/* Cursive Text masked by the drawing paths */}
        <motion.text
          x="15"
          y="50"
          fill="currentColor"
          stroke="currentColor"
          style={{ fontFamily: "var(--font-corinthia)" }}
          className="text-foreground text-4xl select-none"
          mask={`url(#signature-mask-${animationKey})`}
          initial={{ strokeWidth: 0, fontWeight: 400, opacity: 0.4 }}
          animate={{ strokeWidth: 0.7, fontWeight: 700, opacity: 0.75 }}
          transition={{
            duration: 0.8,
            delay: 2.6, // Starts bolding as the signature completes
            ease: "easeInOut",
          }}
        >
          Hrushabh Kale
        </motion.text>

        {/* Elegant Underline Flourish - drawn as an actual line after the signature completes */}
        <motion.path
          d="M 215,52 C 160,65 90,70 30,64 C 18,63 15,59 35,59 C 85,59 165,62 230,66"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/35 dark:text-foreground/25"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.1,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 2.6, // Draws as the signature completes
          }}
        />
      </svg>
    </div>
  );
};
