// src/components/dashboard/BrainCircuit.jsx
import React from 'react';
import { motion } from 'framer-motion';

const BrainCircuit = ({ className = "" }) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg viewBox="0 0 1000 1000" className="w-full h-full transition-opacity duration-500 opacity-20 hover:opacity-40">
        <defs>
          <linearGradient id="brainGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF2E97" stopOpacity="1" />
            <stop offset="50%" stopColor="#00F6FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF2E97" stopOpacity="1" />
          </linearGradient>
          
          <filter id="neonFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix 
              in="blur" 
              type="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="glow" 
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central Brain Core */}
        <motion.path
          d="M500,300 C600,300 650,400 650,500 C650,600 600,700 500,700 C400,700 350,600 350,500 C350,400 400,300 500,300Z"
          stroke="url(#brainGlow)"
          strokeWidth="4"
          fill="none"
          filter="url(#neonFilter)"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 3, ease: "linear" }}
        />

        {/* Neural Connection Paths */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 8;
          const x1 = 500 + Math.cos(angle) * 200;
          const y1 = 500 + Math.sin(angle) * 200;
          const x2 = 500 + Math.cos(angle) * 400;
          const y2 = 500 + Math.sin(angle) * 400;

          return (
            <motion.g key={i}>
              <motion.path
                d={`M${x1},${y1} Q${x1 + 50},${y1 + 50} ${x2},${y2}`}
                stroke="url(#brainGlow)"
                strokeWidth="2"
                fill="none"
                filter="url(#neonFilter)"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 2, delay: i * 0.2 }}
              />
              
              {/* Processing Nodes */}
              <motion.circle
                cx={x2}
                cy={y2}
                r="20"
                fill="none"
                stroke="#00F6FF"
                strokeWidth="2"
                filter="url(#neonFilter)"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            </motion.g>
          );
        })}

        {/* Data Flow Particles */}
        {[...Array(16)].map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            r="3"
            fill="#00F6FF"
            filter="url(#neonFilter)"
            animate={{
              cx: [500, 500 + Math.cos((i * Math.PI) / 8) * 400],
              cy: [500, 500 + Math.sin((i * Math.PI) / 8) * 400],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default BrainCircuit;