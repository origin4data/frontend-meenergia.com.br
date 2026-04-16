"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const logoOpacity = useTransform(scrollYProgress, [0.85, 1.0], [0, 1]);
  const logoScale = useTransform(scrollYProgress, [0.85, 1.0], [0.8, 1]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = progress * video.duration;
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/video-sol.mp4"
          muted
          playsInline
          preload="auto"
        />

        {/* Logo overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: logoOpacity }}
        >
          <motion.div style={{ scale: logoScale }}>
            <Image
              src="/logo-mundo-eletrico.png"
              alt="Mundo Elétrico"
              width={280}
              height={280}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
