import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { RefreshCcw, ArrowLeftIcon, Mail, Clock } from "lucide-react";
import EnhancedCyberpunkBackground from "./EnhancedCyberpunkBackground";
import ExplosionEffect from "./ExplosionEffect";
import CyberpunkError from "./ui/CyberpunkError";  // Make sure this path is correct


  const CyberpunkVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const { signUp, isLoaded, setActive } = useSignUp();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(300); // 5 minutes (60 * 5)
  const [showExplosion, setShowExplosion] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  
  const handleVerificationCheck = async () => {
    try {
      setIsChecking(true);
      if (!signUp || !verificationCode) {
        setError("Please enter the verification code");
        return;
      }
      
      await signUp.attemptEmailAddressVerification({
        code: verificationCode
      });

      setShowExplosion(true);
      setSuccess("Verification successful!");
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Verification failed:', err);
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;

    try {
      await signUp.prepareEmailAddressVerification();
      setResendCooldown(30);
      const cooldownTimer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Failed to resend email:", err);
      setError("Failed to resend verification email. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0A0F1B] to-[#1A0B2E]">
      <EnhancedCyberpunkBackground />

      <AnimatePresence>{showExplosion && <ExplosionEffect />}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <motion.div
          className="w-full max-w-md p-8 border rounded-2xl bg-black/40 backdrop-blur-xl border-white/10"
          style={{ boxShadow: "0 0 15px rgba(0,246,255,0.1)" }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] p-[2px]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center w-full h-full rounded-full bg-[#0A0F1B]">
              <Mail size={40} className="text-[#00F6FF]" />
            </div>
          </motion.div>

          <div className="mb-8 text-center">
            <motion.h1
              className="mb-2 text-3xl font-bold tracking-wider text-white"
              style={{ textShadow: "0 0 10px rgba(0,246,255,0.5)" }}
            >
              CHECK YOUR EMAIL
            </motion.h1>
            <p className="bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] bg-clip-text text-transparent font-semibold">
              VERIFY • ACTIVATE • PROCEED
            </p>
          </div>

          {error && <CyberpunkError message={error} onClose={() => setError(null)} />}
          {success && <CyberpunkError message={success} onClose={() => setSuccess(null)} />}

          <div className="relative mt-8 group">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter Verification Code"
              maxLength={6}
              className="w-full p-4 rounded-lg bg-black/50 border border-white/20 
                text-white placeholder-white/50 text-center text-xl tracking-wider
                focus:outline-none focus:border-[#00F6FF] focus:shadow-[0_0_15px_rgba(0,246,255,0.3)] 
                transition-all duration-300"
              required
            />
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 -z-10 group-hover:opacity-100">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] blur-sm" />
            </div>
          </div>
          
          {/* Countdown Display */}
          <div className="mb-8 text-center">
            <motion.div
              className="text-4xl font-bold text-white"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.floor(countdown / 60)}:
              {(countdown % 60).toString().padStart(2, "0")}
            </motion.div>
      
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <motion.button
              onClick={handleVerificationCheck}
              disabled={isChecking}
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] text-white font-bold relative group overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isChecking ? (
                  <RefreshCcw className="animate-spin" size={20} />
                ) : (
                  "Check Verification Status"
                )}
              </span>
            </motion.button>

            <motion.button
              onClick={handleResendEmail}
              disabled={resendCooldown > 0}
              className="w-full px-6 py-3 text-white border rounded-full border-white/20 hover:border-white/40"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {resendCooldown > 0
                ? `Resend available in ${resendCooldown}s`
                : "Resend Verification Email"}
            </motion.button>

            <motion.button
              onClick={() => navigate("/register")}
              className="w-full px-6 py-3 transition-colors text-white/70 hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Registration
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CyberpunkVerification;