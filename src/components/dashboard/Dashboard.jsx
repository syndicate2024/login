import React, { useState } from "react";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { CircuitPatternCard } from './patterns';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, User, Settings, Menu, LayoutDashboard,
  BookOpen, Code2, Trophy, Activity
} from "lucide-react";
import EnhancedCyberpunkBackground from "../EnhancedCyberpunkBackground";
import ExplosionEffect from "../ExplosionEffect";

const Dashboard = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showExplosion, setShowExplosion] = useState(false);
  const [activeSection, setActiveSection] = useState("Overview");




  const navItems = [
    { icon: LayoutDashboard, title: "Overview", active: activeSection === "Overview" },
    { icon: BookOpen, title: "Learning Progress", active: activeSection === "Learning Progress" },
    { icon: Code2, title: "Projects", active: activeSection === "Projects" },
    { icon: Trophy, title: "Achievements", active: activeSection === "Achievements" },
    { icon: Activity, title: "Recent Activity", active: activeSection === "Recent Activity" }
  ];

  const handleSignOut = () => {
    setShowExplosion(true);
    setTimeout(() => {
      localStorage.removeItem("rememberedCredentials");
      signOut()
        .then(() => navigate("/"))
        .catch((error) => console.error("Error signing out:", error));
    }, 1000);
  };

  const handleNavigation = (section) => {
    setShowExplosion(true);
    setTimeout(() => {
      setActiveSection(section);
      setShowExplosion(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0F1B] overflow-hidden">
      {/* Background - lowest layer */}
      <div className="absolute inset-0 z-0">
        <EnhancedCyberpunkBackground
          colors={{
            neonBlue: "#00F6FF",
            neonPink: "#FF2E97",
            darkPurple: "#1A0B2E",
          }}
        />
      </div>

      {/* Explosion Effect - highest layer */}
      <AnimatePresence>
        {showExplosion && (
          <div className="fixed inset-0 z-50">
            <ExplosionEffect />
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Container - mid layer */}
      <div className="relative z-10">
        {/* Top Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-30 px-4 py-3 border-b bg-black/40 backdrop-blur-xl border-white/10">
          <div className="relative z-[1] flex items-center justify-between mx-auto max-w-7xl">
            {/* Menu Toggle & Title */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="relative p-2 overflow-hidden transition-colors rounded-full group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] opacity-0 group-hover:opacity-20 transition-opacity" />
                <Menu className="w-6 h-6 text-white" />
              </motion.button>

              <motion.h1
                className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] font-orbitron"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(0,246,255,0.5)",
                    "0 0 15px rgba(255,46,151,0.5)",
                    "0 0 10px rgba(0,246,255,0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                CYBERPUNK DASHBOARD
              </motion.h1>
            </div>

            {/* User Controls */}
            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center gap-2 p-2 border rounded-lg bg-black/20 backdrop-blur-lg border-white/10"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative w-10 h-10 p-[2px] rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] opacity-0 group-hover:opacity-20 transition-opacity" />
                  <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                    <User size={20} className="text-[#00F6FF]" />
                  </div>
                </div>
                <span className="text-white font-exo">
                  {user?.username || user?.emailAddresses[0].emailAddress}
                </span>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 overflow-hidden transition-all border rounded-full group bg-black/20 backdrop-blur-lg border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] opacity-0 group-hover:opacity-20 transition-opacity" />
                <Settings size={20} className="text-white/80 group-hover:text-white" />
              </motion.button>

              <motion.button
                onClick={handleSignOut}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 py-2 overflow-hidden rounded-full group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E97] to-[#00F6FF]" />
                <div className="absolute inset-[1px] bg-black rounded-full transition-opacity group-hover:bg-opacity-50" />
                <span className="relative z-[1] flex items-center gap-2 text-white">
                  <LogOut size={20} />
                  Logout
                </span>
              </motion.button>
            </div>
          </div>
        </nav>

        

        {/* Sidebar */}
        <motion.div
          className="fixed top-0 left-0 z-20 h-full pt-20 border-r bg-black/40 backdrop-blur-xl border-white/10"
          animate={{
            width: isSidebarOpen ? "240px" : "0px",
            opacity: isSidebarOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {isSidebarOpen && (
            <div className="relative z-[1] p-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleNavigation(item.title)}
                  className={`flex items-center w-full gap-3 px-4 py-3 mb-2 transition-all rounded-lg group relative overflow-hidden
                             ${item.active ? "bg-white/10" : "hover:bg-white/5"}`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] opacity-0 
                             transition-opacity duration-300 ${
                               item.active ? "opacity-10" : "group-hover:opacity-5"
                             }`}
                  />
                  <item.icon
                    className={`w-5 h-5 transition-colors
                               ${
                                 item.active
                                   ? "text-[#00F6FF]"
                                   : "text-white/70 group-hover:text-[#00F6FF]"
                               }`}
                  />
                  <span
                    className={`font-medium tracking-wide font-exo transition-colors
                               ${
                                 item.active
                                   ? "bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] bg-clip-text text-transparent"
                                   : "text-white/70 group-hover:text-white"
                               }`}
                  >
                    {item.title}
                  </span>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Main Content Area */}        
        <motion.main
          className="relative z-10 pt-24 transition-all duration-300"
          animate={{
            marginLeft: isSidebarOpen ? "240px" : "0px",
          }}
        >
          <div className="px-6 mx-auto max-w-7xl">

          <AnimatePresence mode="wait">
              <CircuitPatternCard 
                title={activeSection}
                isAnimating={showExplosion}
              />
            </AnimatePresence>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-6 overflow-hidden border rounded-xl bg-black/40 backdrop-blur-xl border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E97]/10 to-[#00F6FF]/10" />
              <div className="relative z-[1]">
                <h2 className="mb-4 text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E97] to-[#00F6FF] font-orbitron">
                  Welcome back, {user?.username || "User"}!
                </h2>
                <p className="text-white/80 font-exo">
                  Your cyberpunk journey continues. More features coming soon...
                </p>
              </div>
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;