"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Mode = "auto" | "drag" | "momentum";

export function GoogleReviewsMarquee({
  children,
  durationSeconds,
}: {
  children: ReactNode;
  durationSeconds: number;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let rafId = 0;
    let lastTime = performance.now();
    let x = 0;
    let v = 0;
    let mode: Mode = "auto";
    let hoverPaused = false;

    let dragStartClientX = 0;
    let dragStartTrackX = 0;
    let lastMoveTime = 0;
    let lastMoveClientX = 0;
    let dragVelocity = 0;

    const halfWidth = () => track.scrollWidth / 2;
    const baselineV = () => -halfWidth() / (durationSeconds * 1000);

    const normalize = () => {
      const half = halfWidth();
      if (half <= 0) return;
      while (x <= -half) x += half;
      while (x > 0) x -= half;
    };

    const apply = () => {
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 64);
      lastTime = now;

      if (mode === "momentum") {
        const target = baselineV();
        const decay = Math.pow(0.94, dt / 16.67);
        v = target + (v - target) * decay;
        x += v * dt;
        normalize();
        apply();
        if (Math.abs(v - target) < Math.abs(target) * 0.05 + 0.0005) {
          v = target;
          mode = "auto";
        }
      } else if (mode === "auto" && !hoverPaused) {
        v = baselineV();
        x += v * dt;
        normalize();
        apply();
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const startDrag = (clientX: number) => {
      mode = "drag";
      dragStartClientX = clientX;
      dragStartTrackX = x;
      lastMoveTime = performance.now();
      lastMoveClientX = clientX;
      dragVelocity = 0;
    };

    const moveDrag = (clientX: number) => {
      if (mode !== "drag") return;
      const now = performance.now();
      const dt = now - lastMoveTime;
      if (dt > 0) {
        const instantV = (clientX - lastMoveClientX) / dt;
        dragVelocity = dragVelocity * 0.3 + instantV * 0.7;
      }
      lastMoveTime = now;
      lastMoveClientX = clientX;
      x = dragStartTrackX + (clientX - dragStartClientX);
      normalize();
      apply();
    };

    const endDrag = () => {
      if (mode !== "drag") return;
      const now = performance.now();
      if (now - lastMoveTime > 100) dragVelocity = 0;
      v = dragVelocity;
      mode = "momentum";
    };

    const onTouchStart = (e: TouchEvent) => startDrag(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => moveDrag(e.touches[0].clientX);
    const onTouchEnd = () => endDrag();

    const onMouseEnter = () => {
      hoverPaused = true;
    };
    const onMouseLeave = () => {
      hoverPaused = false;
    };
    const onMouseDown = (e: MouseEvent) => {
      startDrag(e.clientX);
      viewport.style.cursor = "grabbing";
      e.preventDefault();
    };
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX);
    const onMouseUp = () => {
      if (mode !== "drag") return;
      endDrag();
      viewport.style.cursor = "grab";
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      x -= e.deltaX;
      normalize();
      apply();
      e.preventDefault();
    };

    const canHover = window.matchMedia("(hover: hover)").matches;

    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: true });
    viewport.addEventListener("touchend", onTouchEnd, { passive: true });
    viewport.addEventListener("touchcancel", onTouchEnd, { passive: true });
    if (canHover) {
      viewport.addEventListener("mouseenter", onMouseEnter);
      viewport.addEventListener("mouseleave", onMouseLeave);
      viewport.addEventListener("mousedown", onMouseDown);
      viewport.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      cancelAnimationFrame(rafId);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("touchcancel", onTouchEnd);
      if (canHover) {
        viewport.removeEventListener("mouseenter", onMouseEnter);
        viewport.removeEventListener("mouseleave", onMouseLeave);
        viewport.removeEventListener("mousedown", onMouseDown);
        viewport.removeEventListener("wheel", onWheel);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, [durationSeconds]);

  return (
    <div className="mt-12 sm:mt-16 relative marquee-container">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fafaf8] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fafaf8] to-transparent z-10 pointer-events-none" />

      <div
        ref={viewportRef}
        className="overflow-hidden cursor-grab"
        style={{ touchAction: "pan-y" }}
      >
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 w-max will-change-transform"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
