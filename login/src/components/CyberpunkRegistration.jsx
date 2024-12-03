import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, GithubIcon, ArrowLeftIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import EnhancedCyberpunkBackground from './EnhancedCyberpunkBackground';
import ExplosionEffect from './ExplosionEffect';
import { useNavigate } from 'react-router-dom';

const CyberpunkRegistration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch
      return;
    }
    // Handle registration
    console.log('Registration data:', formData);
  };

  const inputClasses = `
    w-full p-4 rounded-lg bg-black/50 border border-white/20 
    text-white placeholder-white/50 
    focus:outline-none focus:border-[#00F6FF] focus:shadow-[0_0_15px_rgba(0,246,255,0.3)] 
    transition-all duration-300
  `;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0A0F1B] to-[#1A0B2E]">
      <EnhancedCyberpunkBackground />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <motion.div 
          className="w-full max-w-md p-8 border rounded-2xl bg-black/40 backdrop-blur-xl border-white/10"
          style={{ boxShadow: '0 0 15px rgba(0,246,255,0.1)' }}
        >
          {/* Logo */}
          <motion.div 
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] p-[2px]"
            whileHover={{ scale: 1.05, rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full h-full rounded-full bg-[#0A0F1B] flex items-center justify-center">
              <UserPlus size={40} className="text-[#00F6FF]" />
            </div>
          </motion.div>

          {/* Title */}
          <div className="mb-8 text-center">
            <motion.h1 
              className="mb-2 text-3xl font-bold tracking-wider text-white"
              style={{ textShadow: '0 0 10px rgba(0,246,255,0.5)' }}
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(0,246,255,0.5)',
                  '0 0 15px rgba(255,46,151,0.5)',
                  '0 0 10px rgba(0,246,255,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              JOIN THE FUTURE
            </motion.h1>
            <p className="bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] bg-clip-text text-transparent font-semibold">
              CREATE • INNOVATE • EVOLVE
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <input 
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Username"
                className={inputClasses}
                required
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 -z-10 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] blur-sm" />
              </div>
            </div>

            <div className="relative group">
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className={inputClasses}
                required
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 -z-10 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] blur-sm" />
              </div>
            </div>

            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                className={inputClasses}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute -translate-y-1/2 right-4 top-1/2 text-white/50 hover:text-white"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 -z-10 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] blur-sm" />
              </div>
            </div>

            <div className="relative group">
              <input 
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm Password"
                className={inputClasses}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute -translate-y-1/2 right-4 top-1/2 text-white/50 hover:text-white"
              >
                {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 -z-10 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] blur-sm" />
              </div>
            </div>

            <label className="relative flex items-center mt-4 transition-colors duration-200 cursor-pointer select-none text-white/80 hover:text-white">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                className="appearance-none h-5 w-5 border rounded border-white/20 bg-black/50 
                         checked:bg-gradient-to-r checked:from-[#FF2E97] checked:to-[#00F6FF]
                         checked:border-transparent focus:outline-none cursor-pointer 
                         transition-all duration-200 mr-2"
                required
              />
              <span className="relative">
                I agree to the Terms and Conditions
              </span>
            </label>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-4 mt-8">
              <motion.button
                type="button"
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] p-[2px] flex items-center justify-center group"
              >
                <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                  <ArrowLeftIcon size={20} className="text-white group-hover:text-[#00F6FF] transition-colors" />
                </div>
              </motion.button>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] text-white font-bold relative group overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Register <UserPlus size={20} />
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
                  <GithubIcon size={20} className="text-white group-hover:text-[#00F6FF] transition-colors" />
                </div>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CyberpunkRegistration;