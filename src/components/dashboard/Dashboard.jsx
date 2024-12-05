import React from 'react';
import { useAuth, useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User, Settings } from 'lucide-react';
import EnhancedCyberpunkBackground from '../EnhancedCyberpunkBackground';

const Dashboard = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Clear any saved credentials
      localStorage.removeItem('rememberedCredentials');
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1B] to-[#1A0B2E]">
      <EnhancedCyberpunkBackground />
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 border-b bg-black/40 backdrop-blur-xl border-white/10">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          {/* Logo/Title */}
          <motion.h1 
            className="text-2xl font-bold text-white font-orbitron"
            animate={{
              textShadow: [
                '0 0 10px rgba(0,246,255,0.5)',
                '0 0 15px rgba(255,46,151,0.5)',
                '0 0 10px rgba(0,246,255,0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CYBERPUNK DASHBOARD
          </motion.h1>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] p-[2px]">
                <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                  <User size={20} className="text-[#00F6FF]" />
                </div>
              </div>
              <span className="text-white font-exo">{user?.username || user?.emailAddresses[0].emailAddress}</span>
            </div>

            {/* Settings Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 transition-colors border rounded-full bg-white/5 hover:bg-white/10 border-white/10 text-white/80 hover:text-white"
            >
              <Settings size={20} />
            </motion.button>

            {/* Logout Button */}
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] text-white font-bold relative group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <LogOut size={20} />
                Logout
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F6FF] to-[#FF2E97] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="px-4 pt-24 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border col-span-full rounded-xl bg-black/40 backdrop-blur-xl border-white/10"
          >
            <h2 className="mb-4 text-xl font-bold text-white font-orbitron">
              Welcome back, {user?.username || 'User'}!
            </h2>
            <p className="text-white/80 font-exo">
              Your cyberpunk journey continues. More features coming soon...
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;