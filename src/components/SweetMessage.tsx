import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type SweetMessageProps = {
  recipientName: string;
  noCount: number;
  onNoClick: () => void;
  onYesClick: () => void;
  accepted: boolean;
};

const CONFETTI_COLORS = ["#f472b6", "#fb7185", "#f43f5e", "#e11d48", "#fbbf24", "#a78bfa"];

function HeartBurst({ onComplete }: { onComplete: () => void }) {
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i / 8) * 360,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {hearts.map(({ id, angle, color }) => (
        <motion.div
          key={id}
          className="absolute"
          initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
          animate={{
            scale: [0, 1.1, 0.9],
            opacity: [1, 1, 0],
            x: Math.cos((angle * Math.PI) / 180) * 120,
            y: Math.sin((angle * Math.PI) / 180) * 120,
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          onAnimationComplete={id === 0 ? onComplete : undefined}
          style={{ width: 24, height: 24 }}
        >
          <svg viewBox="0 0 24 24" fill={color}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function ConfettiRain() {
  const pieces = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.3,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    shape: i % 3,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map(({ id, left, delay, color, shape }) => (
        <motion.div
          key={id}
          className="absolute"
          style={{
            left: `${left}%`,
            top: -20,
            width: shape === 0 ? 8 : 10,
            height: shape === 0 ? 10 : 8,
            borderRadius: shape === 2 ? "50%" : 2,
            backgroundColor: color,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: "100vh",
            opacity: [1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 4.2,
            delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function SweetMessage({
  recipientName,
  noCount,
  onNoClick,
  onYesClick,
  accepted,
}: SweetMessageProps) {
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [acceptedStep, setAcceptedStep] = useState(0);

  useEffect(() => {
    if (noCount === 3) {
      setShowHeartBurst(true);
    } else if (noCount === 4) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4800);
      return () => clearTimeout(t);
    }
    setAnimationKey((k) => k + 1);
  }, [noCount]);

  const showCounter = noCount >= 1 && noCount < 5 && !accepted;
  const showNoButton = noCount < 5 && !accepted;
  const showYesButton = noCount >= 5 && !accepted;

  if (accepted) {
    const showContinue = acceptedStep < 4;
    const continueButtonAnimations = [
      { whileTap: { rotate: 360 } },
      { whileTap: { scale: [1, 0.9, 1.15, 1] } },
      { whileTap: { x: [0, -8, 8, -4, 4, 0] } },
      { whileTap: { scale: [1, 1.2, 0.95, 1], rotate: [0, 10, -10, 0] } },
    ];
    const buttonAnim = continueButtonAnimations[acceptedStep] ?? { whileTap: { scale: 0.95 } };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex max-h-[75dvh] flex-col items-center gap-4 overflow-y-auto overscroll-contain px-4 py-2 text-center sm:px-6"
      >
        <p className="font-['Dancing_Script'] text-3xl font-bold text-rose-700 sm:text-4xl md:text-5xl">
          Yay! You said yes!{" "}
          <span className="text-xs font-normal text-rose-500 sm:text-sm">(sorry the No button disappears)</span>
        </p>
        <p className="font-['Dancing_Script'] text-xl text-rose-600 sm:text-2xl">
          Happy Valentine&apos;s Day, {recipientName}! 💕
        </p>

        {acceptedStep >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-['Dancing_Script'] text-xl text-rose-700 sm:text-2xl md:text-3xl"
          >
            Wait - you&apos;re not just a Valentine... you&apos;ll be my wife and I will be your
            husband!! Isn&apos;t that crazy?
          </motion.p>
        )}

        {acceptedStep >= 2 && (
          <motion.p
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: 1,
              scale: [0, 1.25, 0.9, 1.08, 1],
              rotate: [0, 8, -6, 4, 0],
            }}
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            style={{ transformOrigin: "center" }}
            className="font-['Dancing_Script'] text-lg text-rose-600 sm:text-xl md:text-2xl"
          >
            And it&apos;s an easy date to remember too :D
          </motion.p>
        )}

        {acceptedStep >= 3 && (
          <motion.p
            initial={{ opacity: 0, x: -50, rotate: 0 }}
            animate={{
              opacity: 1,
              x: [-50, 0, 4, -2, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{ duration: 0.975, ease: "easeOut" }}
            className="font-['Caveat'] text-lg font-medium text-rose-600 sm:text-xl md:text-2xl"
          >
            P.S. I also want to apologise for spelling your name wrong - I kept writing Gheena or
            Ghenaa. We might want to change your name for the marriage! JK JK
          </motion.p>
        )}

        {acceptedStep >= 4 && (
          <>
            <motion.p
              initial={{ opacity: 0, scale: 0.6, y: 12 }}
              animate={{
                opacity: [0, 1, 1, 1],
                scale: [0.6, 1.12, 0.98, 1],
                y: 0,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                transformOrigin: "center",
                textShadow: "0 0 24px rgba(244, 114, 182, 0.5)",
              }}
              className="font-['Dancing_Script'] text-xl font-semibold text-rose-700 sm:text-2xl md:text-3xl"
            >
              For a happy marriage and happy life
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="font-['Dancing_Script'] text-xl font-semibold text-rose-600 sm:text-2xl md:text-4xl"
            >
              Enjoy the day and the rest of our life :)
            </motion.p>
          </>
        )}

        {showContinue && (
          <motion.button
            type="button"
            onClick={() => setAcceptedStep((s) => s + 1)}
            className="mt-2 min-h-[48px] min-w-[120px] rounded-full bg-rose-500 px-6 py-3 font-['Dancing_Script'] text-lg font-semibold text-white shadow-lg transition-colors hover:bg-rose-600 active:bg-rose-700 sm:text-xl"
            whileHover={{ scale: 1.05 }}
            {...buttonAnim}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Continue
          </motion.button>
        )}
      </motion.div>
    );
  }

  const getMessageAnimation = () => {
    if (noCount === 1) return { y: [0, 10, -6, 0], scale: [1, 1.02, 0.98, 1], x: 0, rotate: 0 };
    if (noCount === 2) return { x: [-14, 14, -14, 14, 0], scale: 1, y: 0, rotate: 0 };
    if (noCount === 3) return { scale: [1, 0.95, 1.02, 1], x: 0, y: 0, rotate: 0 };
    if (noCount === 4) return { rotate: [-4, 4, -3, 0], y: [0, 4, 0], scale: 1, x: 0 };
    if (noCount === 5) return { scale: [1, 1.18, 1.12, 1.15], opacity: [1, 1, 0.95, 1], x: 0, y: 0, rotate: 0 };
    return { scale: 1, x: 0, y: 0, rotate: 0 };
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 px-4 text-center sm:px-6">
      <AnimatePresence>
        {showHeartBurst && noCount === 3 && (
          <HeartBurst onComplete={() => setShowHeartBurst(false)} />
        )}
        {showConfetti && noCount === 4 && <ConfettiRain />}
      </AnimatePresence>

      <motion.div
        key={animationKey}
        className="flex flex-col items-center gap-4"
        animate={getMessageAnimation()}
        transition={
          noCount === 1
            ? { duration: 1.05, ease: "easeOut" }
            : noCount === 2
              ? { duration: 0.675, ease: "easeOut" }
              : noCount === 3
                ? { duration: 0.9, ease: "easeOut" }
                : noCount === 4
                  ? { duration: 1.2, ease: "easeInOut" }
                  : noCount === 5
                    ? { duration: 1.05, ease: "easeOut" }
                    : {}
        }
      >
        <motion.p
          className="font-['Dancing_Script'] text-2xl font-semibold text-rose-800 sm:text-3xl md:text-4xl"
          style={{
            textShadow: noCount >= 5 ? "0 0 20px rgba(244, 114, 182, 0.4)" : undefined,
          }}
        >
          Will you be my Valentine, {recipientName}? (press no)
        </motion.p>

        {showCounter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="font-['Dancing_Script'] text-2xl font-semibold text-rose-600">
              {noCount} / 5
            </span>
            <motion.span
              className="font-['Dancing_Script'] text-base text-rose-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.3 }}
            >
              Keep going... you&apos;re almost there! 💕
            </motion.span>
          </motion.div>
        )}

        <div className="flex gap-4 pt-2">
          {showNoButton && (
            <motion.button
              type="button"
              onClick={onNoClick}
              className="min-h-[48px] min-w-[88px] rounded-full bg-rose-400 px-6 py-3 font-['Dancing_Script'] text-lg font-semibold text-white shadow-lg transition-colors hover:bg-rose-500 active:bg-rose-600 sm:text-xl"
              whileTap={{ scale: 0.95 }}
            >
              No
            </motion.button>
          )}
          {showYesButton && (
            <motion.button
              type="button"
              onClick={onYesClick}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="min-h-[48px] min-w-[88px] rounded-full bg-rose-600 px-6 py-3 font-['Dancing_Script'] text-lg font-semibold text-white shadow-lg transition-colors hover:bg-rose-700 active:bg-rose-800 sm:text-xl"
              whileTap={{ scale: 0.95 }}
            >
              Yes
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
