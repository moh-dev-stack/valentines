import { useMemo } from "react";
import { motion } from "framer-motion";

const HEART_COUNT = 45;
const TOP_BIAS_COUNT = 18;
const BOTTOM_BIAS_COUNT = 15;
const COLORS = ["#f472b6", "#fb7185", "#f43f5e", "#e11d48"];

const TEXT_EXCLUSION = { leftMin: 20, leftMax: 80, topMin: 30, topMax: 75 };

function isInTextZone(left: number, top: number): boolean {
  return left >= TEXT_EXCLUSION.leftMin && left <= TEXT_EXCLUSION.leftMax &&
    top >= TEXT_EXCLUSION.topMin && top <= TEXT_EXCLUSION.topMax;
}

function getRandomPosition(zone: "top" | "bottom" | "full"): { left: number; top: number } {
  let left: number, top: number;
  do {
    if (zone === "top") {
      left = Math.random() * 100;
      top = Math.random() * 45;
    } else if (zone === "bottom") {
      left = 15 + Math.random() * 70;
      top = 50 + Math.random() * 45;
    } else {
      left = Math.random() * 100;
      top = Math.random() * 100;
    }
  } while (isInTextZone(left, top));
  return { left, top };
}

function Heart({ delay, size, left, top, color }: { delay: number; size: number; left: number; top: number; color: string }) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
      }}
      initial={{ y: 0, opacity: 0.3, rotate: 0 }}
      animate={{
        y: [0, -12, -22, -12, 0],
        opacity: [0.25, 0.4, 0.25, 0.35, 0.25],
        rotate: [0, 5, -4, 5, 0],
      }}
      transition={{
        duration: 11.25,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 24 24" fill={color} className="drop-shadow-md">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
}

export default function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: HEART_COUNT }, (_, i) => {
        const zone =
          i < TOP_BIAS_COUNT ? "top" : i < TOP_BIAS_COUNT + BOTTOM_BIAS_COUNT ? "bottom" : "full";
        const { left, top } = getRandomPosition(zone);
        return {
          id: i,
          delay: (i / HEART_COUNT) * 3,
          size: 16 + Math.random() * 24,
          left,
          top,
          color: COLORS[i % COLORS.length],
        };
      }),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map(({ id, delay, size, left, top, color }) => (
        <Heart key={id} delay={delay} size={size} left={left} top={top} color={color} />
      ))}
    </div>
  );
}
