import React, { useState } from 'react';
import { useAuth, useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, Menu, Home, Book, Code, Trophy, Activity } from 'lucide-react';
import EnhancedCyberpunkBackground from './EnhancedCyberpunkBackground';

const Dashboard = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('rememberedCredentials');
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Navigation items
  const navItems = [
    { icon: Home, title: 'Overview', active: true },
    { icon: Book, title: 'Learning Progress' },
    { icon: Code, title: 'Projects' },
    { icon: Trophy, title: 'Achievements' },
    { icon: Activity, title: 'Recent Activity' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1B] to-[#1A0B2E]">
      <EnhancedCyberpunkBackground />
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 border-b bg-black/40 backdrop-blur-xl border-white/10">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          {/* Title and Menu Toggle */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 transition-colors rounded-full bg-white/5 hover:bg-white/10"
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.button>
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
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] p-[2px]">
                <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                  <User size={20} className="text-[#00F6FF]" />
                </div>
              </div>
              <span className="text-white font-exo">
                {user?.username || user?.emailAddresses[0].emailAddress}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 transition-colors border rounded-full bg-white/5 hover:bg-white/10 border-white/10"
            >
              <Settings size={20} className="text-white/80" />
            </motion.button>

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

      {/* Sidebar */}
      <motion.div 
        className="fixed top-0 left-0 z-40 h-full pt-20 border-r bg-black/40 backdrop-blur-xl border-white/10"
        animate={{
          width: isSidebarOpen ? '240px' : '0px',
          opacity: isSidebarOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {isSidebarOpen && (
          <div className="p-4">
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                className={`flex items-center w-full gap-3 px-4 py-3 mb-2 transition-all rounded-lg group
                           ${item.active 
                             ? 'bg-white/10 border-[#00F6FF]/50' 
                             : 'hover:bg-white/10 hover:border-[#00F6FF]/50'} 
                           border border-transparent`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon 
                  className={`w-5 h-5 transition-colors
                             ${item.active ? 'text-[#00F6FF]' : 'text-white/70 group-hover:text-[#00F6FF]'}`} 
                />
                <span className={`font-medium tracking-wide font-exo
                                ${item.active 
                                  ? 'bg-gradient-to-r from-[#00F6FF] to-[#FF2E97] bg-clip-text text-transparent' 
                                  : 'text-white/70 group-hover:text-white'}`}>
                  {item.title}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Main Content Area */}
      <motion.main 
        className="pt-24 transition-all duration-300"
        animate={{
          marginLeft: isSidebarOpen ? '240px' : '0px'
        }}
      >
        <div className="px-6 mx-auto max-w-7xl">
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
      </motion.main>
    </div>
  );
};

export default Dashboard;