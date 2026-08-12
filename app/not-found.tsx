"use client"

import { motion } from "framer-motion";
import Link from "next/link";

function PixelBlock({
  x,
  y,
  w = 1,
  h = 1,
  color,
  delay = 0,
  className = "",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  color: string;
  delay?: number;
  className?: string;
}) {
  const size = 24;
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
      className={`absolute border-2 border-ink ${color} ${className}`}
      style={{
        left: x * size,
        top: y * size,
        width: w * size,
        height: h * size,
      }}
    />
  );
}

function GroundLine() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-ink" />
    </div>
  );
}

function BlockyBuilding({ x, y, scale = 1, delay = 0 }: { x: string | number; y: number; scale?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 120, damping: 16 }}
      className="absolute"
      style={{ left: x, bottom: y, transform: `scale(${scale})` }}
    >
      <PixelBlock x={0} y={-4} w={3} h={4} color="bg-nuit" delay={delay} />
      <PixelBlock x={3} y={-3} w={2} h={3} color="bg-mantis" delay={delay + 0.05} />
      <PixelBlock x={-2} y={-2} w={2} h={2} color="bg-lime" delay={delay + 0.1} />
      <PixelBlock x={0} y={-1} w={1} h={1} color="bg-cream" delay={delay + 0.15} />
      <PixelBlock x={2} y={-2} w={1} h={1} color="bg-cream" delay={delay + 0.2} />
      <PixelBlock x={3} y={-1} w={1} h={1} color="bg-cream" delay={delay + 0.25} />
    </motion.div>
  );
}

function BlockyCharacter({ x, y, delay = 0 }: { x: string | number; y: number; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 140, damping: 14 }}
      className="absolute"
      style={{ left: x, bottom: y }}
    >
      {/* Head */}
      <PixelBlock x={0} y={-5} w={2} h={2} color="bg-mantis" delay={delay} />
      <PixelBlock x={0.5} y={-4.5} w={0.5} h={0.5} color="bg-ink" delay={delay + 0.05} />
      <PixelBlock x={1.25} y={-4.5} w={0.5} h={0.5} color="bg-ink" delay={delay + 0.07} />
      {/* Body */}
      <PixelBlock x={0} y={-7} w={2} h={2} color="bg-lime" delay={delay + 0.1} />
      <PixelBlock x={-0.5} y={-6} w={0.5} h={1.5} color="bg-nuit" delay={delay + 0.12} />
      <PixelBlock x={2} y={-6} w={0.5} h={1.5} color="bg-nuit" delay={delay + 0.14} />
      {/* Legs */}
      <PixelBlock x={0} y={-8} w={0.8} h={1} color="bg-ink" delay={delay + 0.16} />
      <PixelBlock x={1.2} y={-8} w={0.8} h={1} color="bg-ink" delay={delay + 0.18} />
    </motion.div>
  );
}

function CloudBlock({ x, y, delay = 0 }: { x: string | number; y: string | number; delay?: number }) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="absolute"
      style={{ left: x, top: y }}
    >
      <PixelBlock x={0} y={0} w={2} h={1} color="bg-cream" delay={delay} />
      <PixelBlock x={1.5} y={-0.5} w={2} h={1} color="bg-cream" delay={delay + 0.05} />
      <PixelBlock x={3} y={0} w={1.5} h={1} color="bg-cream" delay={delay + 0.1} />
    </motion.div>
  );
}

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-cream px-6 py-16 text-ink">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Floating clouds */}
      <CloudBlock x="10%" y="15%" delay={0.1} />
      <CloudBlock x="75%" y="22%" delay={0.3} />
      <CloudBlock x="60%" y="10%" delay={0.5} />

      {/* Main card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="boxy relative overflow-hidden bg-cream p-8 text-center sm:p-12">
          {/* Pixel 404 */}
          <div className="relative mx-auto mb-6 inline-flex items-center justify-center">
            <span className="font-display text-7xl font-black tracking-tight text-ink sm:text-9xl">
              404
            </span>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 -top-4 h-10 w-10 bg-lime sm:-right-10 sm:-top-6 sm:h-14 sm:w-14"
              style={{ boxShadow: "3px 3px 0 0 #001f3f" }}
            />
          </div>

          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Page not found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">
            Looks like this chunk got lost in the blocky void. The page you’re looking for doesn’t exist or has been moved to another biome.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center border-2 border-ink bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5 hover:bg-ink/90"
            >
              Back to spawn
            </Link>
            <Link
              href="/readme"
              className="inline-flex items-center justify-center border-2 border-ink bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:bg-lime/90"
            >
              Build a README
            </Link>
          </div>

          {/* Decorative pixel strip */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-6 w-6 bg-mantis" />
            <div className="h-6 w-6 bg-nuit" />
            <div className="h-6 w-6 bg-lime" />
            <div className="h-6 w-6 bg-deep-green" />
            <div className="h-6 w-6 bg-ink" />
          </div>
        </div>
      </motion.div>

      {/* Surface land / buildings */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 w-full overflow-hidden">
        <GroundLine />
        <BlockyBuilding x="8%" y={24} scale={1.2} delay={0.4} />
        <BlockyCharacter x="22%" y={24} delay={0.5} />
        <BlockyBuilding x="35%" y={24} scale={0.9} delay={0.6} />
        <BlockyCharacter x="52%" y={24} delay={0.7} />
        <BlockyBuilding x="65%" y={24} scale={1.1} delay={0.8} />
        <BlockyCharacter x="80%" y={24} delay={0.9} />
        <BlockyBuilding x="90%" y={24} scale={0.8} delay={1.0} />
      </div>

      {/* Small floating blocks */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[15%] top-[35%] h-4 w-4 bg-lime"
      />
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-[20%] top-[40%] h-5 w-5 bg-mantis"
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-[12%] top-[60%] h-3 w-3 bg-nuit"
      />
    </div>
  );
}
