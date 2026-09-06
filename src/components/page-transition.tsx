"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <motion.main id="contenido" tabIndex={-1} key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .45 }}>{children}</motion.main>;
}
