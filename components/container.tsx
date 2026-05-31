"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const childVariants = {
  initial: {
    opacity: 0,
    filter: "blur(12px)",
    y: 8,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
  ...rest
}: ContainerProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={cn("mx-auto max-w-3xl px-4", className)}
      {...(rest as any)}
    >
      {childrenArray.map((child, index) => {
        if (!child) return null;

        return (
          <motion.div
            key={index}
            variants={childVariants}
            className="w-full origin-top"
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
