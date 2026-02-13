import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

type TapHeart = {
  id: number;
  x: number;
  y: number;
};

const COLORS = ["#f472b6", "#fb7185", "#f43f5e"];

export default function InteractiveOverlay() {
  const [hearts, setHearts] = useState<TapHeart[]>([]);
  const [nextId, setNextId] = useState(0);

  const handleTap = useCallback((e: React.MouseEvent) => {
    const x = e.clientX - 16;
    const y = e.clientY - 16;
    const id = nextId;
    setNextId((n) => n + 1);
    setHearts((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 3150);
  }, [nextId]);

  return (
    <div
      className="fixed inset-0 z-0"
      onClick={handleTap}
      role="presentation"
      aria-hidden
    >
      <AnimatePresence>
        {hearts.map(({ id, x, y }) => (
          <motion.div
            key={id}
            className="pointer-events-none absolute"
            style={{
              left: x,
              top: y,
              width: 32,
              height: 32,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.15, 1],
              opacity: [1, 1, 0],
              y: [0, -80],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.85,
              ease: "easeOut",
            }}
          >
            <svg viewBox="0 0 24 24" fill={COLORS[id % COLORS.length]} className="drop-shadow-md">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
