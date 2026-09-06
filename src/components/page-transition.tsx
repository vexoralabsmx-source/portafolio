"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  return <motion.main id="contenido" tabIndex={-1} key={pathname} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .4 }}>{children}</motion.main>;
}
