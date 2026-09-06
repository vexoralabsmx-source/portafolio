"use client";

import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type HeadingProps = { children: ReactNode; as?: "h1" | "h2"; className?: string };
const wordMotion = {
  hidden: { opacity: 0, y: "0.75em", rotateX: 25 },
  visible: { opacity: 1, y: "0em", rotateX: 0, transition: { duration: .65, ease: [.22, 1, .36, 1] as const } },
};

function splitWords(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return child.split(/(\s+)/).map((word, index) => /^\s+$/.test(word)
        ? word
        : <motion.span className="animated-word" variants={wordMotion} key={index}>{word}</motion.span>);
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
      return cloneElement(child, {}, splitWords(child.props.children));
    }
    return child;
  });
}

export function AnimatedHeading({ children, as = "h2", className = "" }: HeadingProps) {
  const reduced = useReducedMotion();
  const Heading = as === "h1" ? motion.h1 : motion.h2;
  return <Heading className={`animated-heading ${className}`} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .045 } } }}>
    {splitWords(children)}
  </Heading>;
}
