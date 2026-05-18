"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  meta?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 };
const TAP_SPRING  = { type: "spring" as const, stiffness: 450, damping: 18, mass: 1 };

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef<number>(0);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return;
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 20) {
        delta > 0 ? handleNext() : handlePrev();
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
  const onDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -10000) handleNext();
    else if (swipe > 10000) handlePrev();
  };

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardGap = isMobile ? 200 : 360;
  const cardDepth = isMobile ? 100 : 140;
  const cardRotation = isMobile ? -14 : -18;

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex w-full flex-col overflow-hidden outline-none select-none overflow-x-hidden",
        className
      )}
      style={{ background: "#F2F2ED" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Ambient glow from active image — very subtle on light bg */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeItem.imageSrc}
              alt=""
              className="h-full w-full object-cover blur-3xl saturate-200 scale-110"
            />
          </motion.div>
        </AnimatePresence>
        {/* Vignette to keep it clean */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 20%, #F2F2ED 80%)"
        }} />
      </div>

      {/* Rail */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8 min-h-0">
        <motion.div
          className="relative mx-auto flex h-[55vw] md:h-125 w-full max-w-6xl items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: "1400px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];
            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            const xOffset = offset * cardGap;
            const zOffset = -dist * cardDepth;
            const scale = isCenter ? 1 : 0.80;
            const rotateY = offset * cardRotation;
            const opacity = isCenter ? 1 : Math.max(0.08, 1 - dist * 0.55);
            const blur = isCenter ? 0 : dist * 5;
            const brightness = isCenter ? 1 : 0.6;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute aspect-3/4 w-48 md:w-96 rounded-2xl overflow-hidden",
                  isCenter ? "z-20" : "z-10"
                )}
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: isCenter
                    ? "0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)"
                    : "0 8px 24px rgba(0,0,0,0.08)",
                }}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale,
                  rotateY,
                  opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={{ ...BASE_SPRING, scale: TAP_SPRING }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="h-full w-full object-cover pointer-events-none"
                />
                {/* Subtle top sheen */}
                <div className="absolute inset-0 bg-linear-to-b from-white/8 via-transparent to-transparent pointer-events-none" />
                {/* Bottom fade for active card */}
                {isCenter && (
                  <div
                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                    style={{
                      height: "55%",
                      background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info & Controls */}
        <div className="mx-auto mt-4 md:mt-10 flex w-full max-w-4xl flex-col items-center justify-between gap-3 md:gap-5 md:flex-row pointer-events-auto pb-4 md:pb-0">

          {/* Text info */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left md:h-28 justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.28 }}
                className="space-y-1.5"
              >
                {activeItem.meta && (
                  <span
                    className="inline-block text-xs font-semibold uppercase tracking-widest"
                    style={{
                      color: "#0066BD",
                      fontFamily: "var(--font-jakarta, sans-serif)",
                      letterSpacing: "0.14em",
                    }}
                  >
                    {activeItem.meta}
                  </span>
                )}
                <h2
                  className="text-lg font-bold tracking-tight md:text-3xl"
                  style={{
                    color: "#141410",
                    fontFamily: "var(--font-display, sans-serif)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {activeItem.title}
                </h2>
                {activeItem.description && (
                  <p
                    className="max-w-sm text-xs md:text-sm leading-relaxed"
                    style={{
                      color: "#6A6A60",
                      fontFamily: "var(--font-jakarta, sans-serif)",
                    }}
                  >
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center gap-3">
            {/* Dot indicators */}
            <div className="hidden md:flex items-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === activeIndex ? 20 : 6,
                    height: 6,
                    background: i === activeIndex ? "#0066BD" : "#DEDED6",
                  }}
                  aria-label={`Ir para ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div
              className="flex items-center gap-1 rounded-full p-1"
              style={{
                background: "#fff",
                border: "1px solid #DEDED6",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <button
                onClick={handlePrev}
                className="rounded-full p-2.5 transition-all hover:bg-gray-100 active:scale-95"
                style={{ color: "#6A6A60" }}
                aria-label="Anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span
                className="min-w-11 text-center text-xs font-medium"
                style={{ color: "#9A9A90", fontFamily: "var(--font-jakarta, sans-serif)" }}
              >
                {activeIndex + 1} / {count}
              </span>
              <button
                onClick={handleNext}
                className="rounded-full p-2.5 transition-all hover:bg-gray-100 active:scale-95"
                style={{ color: "#6A6A60" }}
                aria-label="Próximo"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
