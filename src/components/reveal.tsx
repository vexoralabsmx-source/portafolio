"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

export function Reveal({ children, className = "", delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className}
    initial={reduced ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-35px" }}
    transition={{ duration: reduced ? 0 : .65, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}
    {...props}>{children}</motion.div>;
}
