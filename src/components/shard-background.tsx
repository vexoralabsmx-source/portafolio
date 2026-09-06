"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

const AeroShards = dynamic(() => import("./AeroShards"), { ssr: false });

export function ShardBackground() {
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled("gpu" in navigator && !media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return <>
    <div className="shard-background" aria-hidden="true">
      <div className="shard-fallback">{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ left: `${38 + (i * 17 % 62)}%`, top: `${12 + (i * 13 % 76)}%`, transform: `rotate(${i * 19}deg) scale(${.4 + (i % 5) * .25})` }} />)}</div>
      {enabled && <AeroShards backgroundColor="#080808" shardColor="#b00606" accentColor="#fbfbfb" placement="right" flow="stream" material="pearl" density={1.1} speed={.65} bloom={.5} paused={paused} onError={() => setEnabled(false)} />}
      <div className="shard-scrim" />
    </div>
    {enabled && <button className="motion-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? "Reanudar animación" : "Pausar animación"} aria-pressed={paused}>{paused ? <Play size={14}/> : <Pause size={14}/>}<span>{paused ? "Reanudar fondo" : "Pausar fondo"}</span></button>}
  </>;
}
