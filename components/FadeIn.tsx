"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
};

export default function FadeIn({ children, delay = 0, className = "", direction = "up" }: Props) {
  // Config for direction
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 40 : 0, 
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: delay }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // Triggers when element is 100px into view
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}