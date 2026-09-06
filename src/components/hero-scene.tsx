"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BarChart3, Check, Circle, Code2, Layers3 } from "lucide-react";

export function HeroScene() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  return (
    <motion.div className="hero-scene" onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - .5); y.set((e.clientY - r.top) / r.height - .5); }} onPointerLeave={() => { x.set(0); y.set(0); }}>
      <div className="scene-orbit orbit-a" /><div className="scene-orbit orbit-b" />
      <motion.div className="laptop" style={{ rotateX, rotateY, transformPerspective: 1200 }} initial={{ opacity: 0, y: 70, rotateX: 15 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1.2, delay: .2, ease: [0.22, 1, .36, 1] }}>
        <div className="laptop-screen">
          <div className="browser-bar"><div><i/><i/><i/></div><span>miguelangel.digital / selected work</span></div>
          <div className="screen-ui">
            <aside><b>MÁ</b><span className="selected"><Layers3 /></span><span><BarChart3 /></span><span><Code2 /></span></aside>
            <main><span className="ui-kicker">INDEPENDENT DIGITAL STUDIO / 2026</span><h3>BUILT TO<br/><em>LEAD.</em></h3><div className="ui-lines"><i/><i/></div><div className="ui-grid"><span/><span/><span/></div></main>
          </div>
        </div>
        <div className="laptop-base" />
      </motion.div>
      <motion.div className="float-card card-code glass" animate={{ y: [0, -10, 0], rotate: [-3, -1, -3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><div><Code2 /><span>Build status</span></div><b><Check size={15}/> Production ready</b></motion.div>
      <motion.div className="float-card card-metric glass" animate={{ y: [0, 12, 0], rotate: [4, 2, 4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><span>EXPERIENCE SCORE</span><strong>98<span>/100</span></strong><div className="metric-bar"><i /></div></motion.div>
      <div className="scene-chip chip-a"><Circle fill="currentColor" /> STRATEGY + UI/UX</div><div className="scene-chip chip-b"><Circle fill="currentColor" /> DIGITAL ENGINEERING</div>
    </motion.div>
  );
}
