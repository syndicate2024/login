import React from 'react';
import { motion } from 'framer-motion';

const CircuitPatternCard = ({ title, isAnimating = false }) => {
  return (
    <motion.div
      className="relative overflow-hidden border rounded-xl bg-black/40 backdrop-blur-xl border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF2E97" />
            <stop offset="100%" stopColor="#00F6FF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" />
            <feComposite operator="over" />
          </filter>
        </defs>

        {/* Circuit paths */}
        <motion.path
          d="M50,200 L150,200 Q200,200 200,150 L200,50"
          stroke="url(#circuitGrad)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Circuit nodes */}
        {[50, 150, 200].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={i === 2 ? 50 : 200}
            r="4"
            fill="#00F6FF"
            filter="url(#glow)"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}

        {/* Data flow particles */}
        <motion.circle
          r="3"
          fill="#00F6FF"
          filter="url(#glow)"
          animate={{
            cx: [50, 150, 200],
            cy: [200, 200, 50],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>

      <div className="relative z-10 p-6">
        <h2 className="mb-4 text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] font-orbitron">
          {title}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Content slots */}
        </div>
      </div>
    </motion.div>
  );
};

export default CircuitPatternCard;