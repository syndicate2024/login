import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, GithubIcon, LogInIcon } from "lucide-react";
import EnhancedCyberpunkBackground from "./EnhancedCyberpunkBackground";
import ExplosionEffect from "./ExplosionEffect";
import { Link } from "react-router-dom";

// Add this somewhere in your component for testing
<button
  onClick={() => {
    localStorage.clear();
    window.location.reload();
  }}
  className="absolute top-4 right-4 text-white/50 hover:text-white"
>
  Clear Storage
</button>;

const CyberpunkLoginEnhanced = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showExplosion, setShowExplosion] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const clearCredentials = () => {
    setCredentials({
      email: "",
      password: "",
      rememberMe: false,
    });
    localStorage.removeItem("rememberedUser");
  };

  // Add this useEffect near your other useEffect hooks
  useEffect(() => {
    // Check for remembered user on mount
    const remembered = localStorage.getItem("rememberedUser");
    if (remembered) {
      const savedCredentials = JSON.parse(remembered);
      if (savedCredentials.rememberMe) {
        setCredentials(prev => ({
          ...prev,
          email: savedCredentials.email,
          rememberMe: true
        }));
      } else {
        localStorage.removeItem("rememberedUser");
      }
    }
  
    // Start loading timeout
    setTimeout(() => setIsLoading(false), 2000);
  
    // Cleanup on unmount
    return () => {
      if (!credentials.rememberMe) {
        clearCredentials();
      }
    };
  }, []);

  // Update the handleLogin function
  const handleLogin = (e) => {
    e.preventDefault();

    if (credentials.rememberMe) {
      localStorage.setItem(
        "rememberedUser",
        JSON.stringify({
          email: credentials.email,
          rememberMe: true,
        })
      );
    } else {
      clearCredentials();
    }

    setShowExplosion(true);
  };

  const handleExplosionComplete = () => {
    // Handle post-explosion navigation/state changes
    console.log("Explosion complete - navigate to main app");
  };

  const inputClasses = `
    w-full p-4 rounded-lg bg-black/50 border border-white/20 
    text-white placeholder-white/50 
    focus:outline-none focus:border-[#00F6FF] focus:shadow-[0_0_15px_rgba(0,246,255,0.3)] 
    transition-all duration-300
  `;

  // Custom checkbox styles
  const checkboxWrapper = `
    relative flex items-center mt-4 cursor-pointer
    select-none text-white/80 hover:text-white
    transition-colors duration-200
  `;

  const checkboxStyle = `
    appearance-none h-5 w-5 border rounded
    border-white/20 bg-black/50
    checked:bg-gradient-to-r checked:from-[#FF2E97] checked:to-[#00F6FF]
    checked:border-transparent focus:outline-none
    cursor-pointer transition-all duration-200
    mr-2
  `;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0A0F1B] to-[#1A0B2E]">
      <EnhancedCyberpunkBackground />

      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="absolute px-4 py-2 text-sm border rounded-full top-4 right-4 text-white/50 hover:text-white border-white/20 backdrop-blur-sm"
      >
        Clear Storage
      </button>

      <AnimatePresence>
        {showExplosion && (
          <ExplosionEffect onComplete={handleExplosionComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && !showExplosion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fixed inset-0 flex items-center justify-center p-4"
          >
            <motion.div
              className="w-full max-w-md p-8 border rounded-2xl bg-black/40 backdrop-blur-xl border-white/10"
              style={{
                boxShadow: "0 0 15px rgba(0,246,255,0.1)",
              }}
            >
              {/* Logo/Avatar */}
              <motion.div
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] p-[2px]"
                whileHover={{ scale: 1.05, rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full h-full rounded-full bg-[#0A0F1B] flex items-center justify-center">
                  <Camera size={40} className="text-[#00F6FF]" />
                </div>
              </motion.div>

              {/* Title with glitch effect */}
              <div className="mb-8 text-center">
                <motion.h1
                  className="mb-2 text-3xl font-bold tracking-wider text-white"
                  style={{ textShadow: "0 0 10px rgba(0,246,255,0.5)" }}
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(0,246,255,0.5)",
                      "0 0 15px rgba(255,46,151,0.5)",
                      "0 0 10px rgba(0,246,255,0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  EMPOWER YOUR SKILLS
                </motion.h1>
                <p className="bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] bg-clip-text text-transparent font-semibold">
                  LEARN • BUILD • GROW
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative group">
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    placeholder="Email"
                    className={inputClasses}
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 -z-10 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] blur-sm" />
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    placeholder="Password"
                    className={inputClasses}
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 -z-10 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] blur-sm" />
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <label className={checkboxWrapper}>
                  <input
                    type="checkbox"
                    checked={credentials.rememberMe}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setCredentials((prev) => ({
                        ...prev,
                        rememberMe: isChecked,
                      }));
                      if (!isChecked) {
                        clearCredentials();
                      }
                    }}
                    className={checkboxStyle}
                  />
                  <span className="relative">
                    Remember Me
                    <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  </span>
                </label>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-4 mt-8">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] p-[2px] flex items-center justify-center group"
                  >
                    <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                      <span className="text-2xl text-white group-hover:text-[#00F6FF] transition-colors">
                        G
                      </span>
                    </div>
                  </motion.button>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-12 py-4 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] text-white font-bold relative group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Begin <LogInIcon size={20} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00F6FF] to-[#FF2E97] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] p-[2px] flex items-center justify-center group"
                  >
                    <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                      <GithubIcon
                        size={20}
                        className="text-white group-hover:text-[#00F6FF] transition-colors"
                      />
                    </div>
                  </motion.button>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    to="/register"
                    className="transition-colors duration-200 text-white/70 hover:text-white"
                  >
                    Don&apos;t have an account?
                    <span className="ml-1 bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] bg-clip-text text-transparent">
                      Register here
                    </span>
                  </Link>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#0A0F1B] flex items-center justify-center z-50"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-16 h-16 border-4 border-t-[#FF2E97] border-r-[#00F6FF] border-b-[#FF2E97] border-l-[#00F6FF] rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CyberpunkLoginEnhanced;
