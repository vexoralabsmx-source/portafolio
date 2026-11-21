"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CINEMATIC_SCENES } from "@/lib/cinematic-scenes";

gsap.registerPlugin(ScrollTrigger);

const FRAME = 1 / 24;

export default function CinematicScenes() {
  const stageRef = useRef(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const layers = Array.from(stage.children);
    const videos = layers.map((layer) => layer.querySelector("video"));
    const sections = CINEMATIC_SCENES.map(({ id }) => document.getElementById(id));
    const footer = document.getElementById("cinematic-footer");
    const motion = gsap.matchMedia();

    motion.add({
      reduced: "(prefers-reduced-motion: reduce)",
      touch: "(pointer: coarse)",
      standard: "(prefers-reduced-motion: no-preference)",
      narrow: "(max-width: 767px)",
    }, ({ conditions }) => {
      const { reduced, touch, narrow } = conditions;
      const media = videos.map((video) => ({
        video, loaded: false, requested: false, slowSeeks: 0, seekStarted: 0,
      }));
      const activate = (index) => {
        const item = media[index];
        if (!item || item.requested || reduced) return;
        item.requested = true;
        item.video.preload = "auto";
        item.video.src = CINEMATIC_SCENES[index].src;
      };

      let active = -1;
      let frame = 0;
      let points = [];
      let scrollTop = 0;
      let footerPoint = 0;
      let playback = touch || narrow || navigator.connection?.saveData === true;
      const state = { y: 0 };
      const sceneTimelines = CINEMATIC_SCENES.map(({ framing }, index) => {
        const timeline = gsap.timeline({ paused: true });
        return timeline.fromTo(layers[index],
          { scale: 1, xPercent: -framing[0], yPercent: -framing[1] },
          { scale: 1.055, xPercent: framing[0], yPercent: framing[1], duration: 1, ease: "none" });
      });
      const mainTimeline = gsap.timeline({ paused: true })
        .to(state, { y: 1, duration: 1, ease: "none" });

      const clamp = gsap.utils.clamp(0, 1);
      const easeBlend = gsap.parseEase("sine.inOut");
      const pageTop = (element) => element.getBoundingClientRect().top + window.scrollY;

      function seek(item, progress) {
        const { video } = item;
        if (!item.loaded || video.seeking || !Number.isFinite(video.duration)) return;
        const target = Math.max(0, Math.min(video.duration - FRAME, Math.round(progress * video.duration / FRAME) * FRAME));
        if (Math.abs(video.currentTime - target) >= FRAME * 0.9) {
          item.seekStarted = performance.now();
          video.currentTime = target;
        }
      }

      function render() {
        frame = 0;
        if (!points.length) return;
        const y = scrollTop * state.y;
        const viewport = window.innerHeight;
        const index = Math.max(0, points.findLastIndex((point) => y >= point));
        const nextIndex = index + 1;
        const end = points[nextIndex] ?? footerPoint;
        const transition = Math.min(viewport * (narrow ? 0.24 : 0.36), (end - points[index]) / 2);
        const blend = nextIndex < layers.length && !reduced
          ? easeBlend(clamp((y - (end - transition)) / transition))
          : 0;
        const progress = clamp((y - points[index]) / Math.max(1, end - points[index]));
        const footerFade = clamp((footerPoint - y) / Math.max(1, viewport * 0.55));
        stage.style.opacity = String(footerFade);

        activate(index);
        activate(nextIndex);
        if (active !== index || footerFade === 0) {
          active = footerFade === 0 ? -1 : index;
          media.forEach(({ video }, other) => {
            if (other !== active) video.pause();
          });
        }

        layers.forEach((layer, other) => {
          const opacity = other === index ? 1 : other === nextIndex ? blend : 0;
          layer.style.opacity = String(opacity);
          layer.style.visibility = opacity ? "visible" : "hidden";
        });

        if (reduced || active < 0) return;
        sceneTimelines[index].progress(progress);
        if (blend) sceneTimelines[nextIndex].progress(0);

        const item = media[index];
        const { video } = item;
        if (!item.loaded && video.readyState >= 2) {
          item.loaded = true;
          video.style.opacity = "1";
        }
        if (playback) {
          if (document.hidden) return;
          if (item.loaded && video.paused && !item.playPending && !item.playRejected) {
            item.playPending = true;
            video.play().then(() => {
              if (active !== index || disposed || document.hidden) video.pause();
            }).catch((error) => {
              if (error.name !== "AbortError") item.playRejected = true;
            })
              .finally(() => { item.playPending = false; });
          }
          return;
        }

        seek(item, progress);
        if (blend) seek(media[nextIndex], 0);
      }

      let disposed = false;
      const schedule = () => {
        if (!frame && !disposed) frame = requestAnimationFrame(render);
      };
      const onVisibilityChange = () => {
        if (document.hidden) videos.forEach((video) => video.pause());
        else schedule();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);
      const listeners = media.map((item) => {
        const ready = () => {
          item.loaded = true;
          item.video.style.opacity = "1";
          schedule();
        };
        const seeked = () => {
          if (item.seekStarted && performance.now() - item.seekStarted > 180) item.slowSeeks++;
          else item.slowSeeks = 0;
          item.seekStarted = 0;
          if (item.slowSeeks >= 3) playback = true;
          schedule();
        };
        item.video.addEventListener("loadeddata", ready);
        item.video.addEventListener("seeked", seeked);
        item.video.addEventListener("canplay", ready);
        return () => {
          item.video.removeEventListener("loadeddata", ready);
          item.video.removeEventListener("seeked", seeked);
          item.video.removeEventListener("canplay", ready);
        };
      });
      const sync = (trigger) => {
        mainTimeline.progress(trigger.progress);
        schedule();
      };
      const measure = (trigger) => {
        scrollTop = trigger.end;
        footerPoint = trigger.end;
        const lead = window.innerHeight * (narrow ? 0.18 : 0.47);
        points = sections.map((section, index) => index ? Math.max(0, pageTop(section) - lead) : 0);
        sync(trigger);
      };
      const trigger = ScrollTrigger.create({
        trigger: sections[0],
        start: "top top",
        endTrigger: footer,
        end: "clamp(top top)",
        onRefresh: measure,
        onUpdate: sync,
      });
      measure(trigger);

      return () => {
        disposed = true;
        active = -1;
        cancelAnimationFrame(frame);
        trigger.kill();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        mainTimeline.kill();
        sceneTimelines.forEach((timeline) => timeline.kill());
        listeners.forEach((remove) => remove());
        media.forEach(({ video, requested }) => {
          video.pause();
          video.style.opacity = "";
          if (requested) {
            video.removeAttribute("src");
            video.load();
          }
        });
        layers.forEach((layer) => {
          layer.style.opacity = "";
          layer.style.visibility = "";
        });
        stage.style.opacity = "";
      };
    });

    return () => motion.revert();
  }, []);

  return (
    <div className="cinematic-stage" aria-hidden="true">
      <div className="cinematic-light" />
      <div className="cinematic-screen" ref={stageRef}>
        {CINEMATIC_SCENES.map(({ id, poster }) => (
          <div key={id} className="cinematic-frame" style={{ backgroundImage: `url(${poster})` }}>
            <video muted playsInline loop preload="none" disablePictureInPicture />
          </div>
        ))}
      </div>
      <div className="cinematic-shade" />
    </div>
  );
}
