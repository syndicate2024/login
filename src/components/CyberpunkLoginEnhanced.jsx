import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EnhancedCyberpunkBackground from "./EnhancedCyberpunkBackground";
import ExplosionEffect from "./ExplosionEffect";
import { Link } from "react-router-dom";
import { useSignIn, useUser, useClerk } from "@clerk/clerk-react";
import PropTypes from 'prop-types';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

// Error Message Component
const ErrorMessage = ({ message }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative px-4 py-2 mb-4 border rounded-lg font-exo
                   border-[#FF2E97] bg-black/40 backdrop-blur-sm
                   text-[#FF2E97] text-sm"
      >
        <div className="absolute inset-0 rounded-lg bg-[#FF2E97] opacity-5" />
        <p className="relative z-10">{message}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

ErrorMessage.propTypes = {
  message: PropTypes.string
};

// Clear Storage Button Component
const ClearStorageButton = ({ onClear }) => (
  <motion.div
    className="absolute z-50 top-4 right-4"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <button
      onClick={onClear}
      className="relative px-4 py-2 text-sm border rounded-full font-exo 
                text-white/50 border-white/20 backdrop-blur-sm 
                transition-all duration-300 
                hover:text-white hover:border-[#00F6FF] 
                hover:shadow-[0_0_15px_rgba(0,246,255,0.3)]
                group overflow-hidden"
    >
      <span className="relative z-10">Clear Storage</span>
      <div className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] blur opacity-50" />
      </div>
    </button>
  </motion.div>
);

ClearStorageButton.propTypes = {
  onClear: PropTypes.func.isRequired
};

const OAuthButton = ({ provider, icon: Icon }) => {
  const { signIn } = useClerk();

  const handleOAuthSignIn = async (strategy) => {
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err) {
      console.error('OAuth error:', err);
    }
  };

  return (
    <button
      onClick={() => handleOAuthSignIn(`oauth_${provider}`)}
      className="flex items-center justify-center w-full gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
    >
      <Icon className="w-5 h-5" />
      <span>Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
    </button>
  );
};

const CyberpunkLoginEnhanced = () => {
  const navigate = useNavigate();
  const clerk = useClerk();
  const { isLoaded: userLoaded } = useUser();
  const { 
    isLoaded: signInLoaded, 
    signIn: clerkSignIn, 
    setActive: setActiveSession, 
    isSignedIn 
  } = useSignIn();

  const [isLoading, setIsLoading] = useState(true);
  const [showExplosion, setShowExplosion] = useState(false);
  const [error, setError] = useState(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    // Simplified loading check
    const timer = setTimeout(() => {
      if (userLoaded && signInLoaded) {
        setIsLoading(false);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (!credentials.rememberMe) {
        clearCredentials();
      }
    };
  }, [userLoaded, signInLoaded, credentials.rememberMe]);

  useEffect(() => {
    if (userLoaded && isSignedIn) {
      navigate('/dashboard');
    }
  }, [userLoaded, isSignedIn, navigate]);

  const clearCredentials = () => {
    setCredentials({
      email: "",
      password: "",
      rememberMe: false
    });
    localStorage.removeItem('rememberedCredentials');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (isSignedIn) {
        navigate('/dashboard');
        return;
      }

      console.log("Attempting sign in...");
      const result = await clerkSignIn.create({
        identifier: credentials.email,
        password: credentials.password,
      });
      
      if (result.status === "complete") {
        await setActiveSession({ session: result.createdSessionId });
        
        if (credentials.rememberMe) {
          localStorage.setItem('rememberedCredentials', JSON.stringify({
            email: credentials.email,
            rememberMe: true
          }));
        } else {
          clearCredentials();
        }

        setShowExplosion(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.message?.includes('single session mode')) {
        navigate('/dashboard');
      } else {
        setError(err.message || "An error occurred during sign in");
      }
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setError(null);
  
      await clerkSignIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard"
      });
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message || "Google login failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };
  
  const handleFacebookLogin = async () => {
    try {
      setIsFacebookLoading(true);
      console.log("Starting Facebook OAuth flow...");
      
      await clerkSignIn.authenticateWithRedirect({
        strategy: "oauth_facebook",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard"
      });
    } catch (err) {
      console.error("Facebook login error:", err);
      setError("Facebook login failed. Please try again or use another method.");
    } finally {
      setIsFacebookLoading(false);
    }
  };

  const handleExplosionComplete = () => {
    navigate("/dashboard");
  };

  const handleClearStorage = () => {
    // Clear all storage related to credentials
    localStorage.clear();
    sessionStorage.clear();
    clearCredentials();
    
    // Force a clean reload of the page
    window.location.href = window.location.origin;
  };

  // Styles
  const inputClasses = `
    w-full p-4 rounded-lg bg-black/50 border border-white/20 font-exo
    text-white placeholder-white/50 
    focus:outline-none focus:border-[#00F6FF] focus:shadow-[0_0_15px_rgba(0,246,255,0.3)] 
    transition-all duration-300
  `;

  // Add this useEffect to check auth state
  useEffect(() => {
    if (userLoaded && signInLoaded) {
      const checkAuth = async () => {
        try {
          const session = await clerk.session;
          if (session) {
            navigate("/dashboard");
          }
        } catch (err) {
          console.error("Auth check error:", err);
        }
      };
      checkAuth();
    }
  }, [userLoaded, signInLoaded, clerk, navigate]);

  useEffect(() => {
    const saved = localStorage.getItem('rememberedCredentials');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCredentials(prev => ({
        ...prev,
        email: parsed.email,
        rememberMe: parsed.rememberMe
      }));
    }
  }, []);

  useEffect(() => {
    // Clear credentials on component unmount if remember me is not checked
    return () => {
      if (!credentials.rememberMe) {
        clearCredentials();
        localStorage.removeItem('rememberedCredentials');
      }
    };
  }, [credentials.rememberMe]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0A0F1B] to-[#1A0B2E]">
      <EnhancedCyberpunkBackground />

      <ClearStorageButton onClear={handleClearStorage} />

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
              {/* Error Message */}
              <ErrorMessage message={error} />

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
                  className="mb-2 text-3xl font-bold tracking-wider text-white font-orbitron"
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
                <p className="bg-gradient-to-r font-exo from-[#FF2E97] to-[#00F6FF] bg-clip-text text-3xl tracking-widest text-transparent font-semibold">
                  LEARN • BUILD • GROW
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative group font-exo">
                  <input
                    type="text"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    placeholder="Email or Username"
                    className={inputClasses}
                    autoComplete="off" // Add this
                    autoSave="off" // Add this
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
                    autoComplete="new-password"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 -z-10 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] blur-sm" />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-4 mt-8">
                  {/* Google Button */}
                  <motion.button
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] p-[2px]"
                  >
                    <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                      {isGoogleLoading ? (
                        <RefreshCcw className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        <FcGoogle className="w-7 h-7" />
                      )}
                    </div>
                  </motion.button>

                  {/* Main Login Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-grow px-12 py-4 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] text-white font-bold relative font-exo group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 font-orbitron">
                      Begin <LogIn size={20} />
                    </span>

                    <div className="absolute inset-0 bg-gradient-to-r from-[#00F6FF] to-[#FF2E97] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  {/* Facebook Button */}
                  <motion.button
                    onClick={handleFacebookLogin}
                    disabled={isFacebookLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] p-[2px]"
                  >
                    <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                      {isFacebookLoading ? (
                        <RefreshCcw className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        <span className="text-[2rem] font-bold leading-none text-[#1877F2] group-hover:text-[#2196F3]">
                          f
                        </span>
                      )}
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
