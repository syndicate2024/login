import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { ClerkProvider } from "@clerk/clerk-react";
import CyberpunkLoginEnhanced from './components/CyberpunkLoginEnhanced';
import CyberpunkRegistration from './components/CyberpunkRegistration';
import CyberpunkVerification from './components/CyberpunkVerification';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';

// Loading screen component stays the same
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-[#0A0F1B] flex items-center justify-center z-50">
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
  </div>
);

// SSO Callback component stays the same
const SSOCallback = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        navigate('/dashboard');
      } else {
        // If sign in failed, redirect back to login
        navigate('/', { 
          state: { 
            error: 'Social login failed. Please try again.' 
          }
        });
      }
    }
  }, [isLoaded, isSignedIn, navigate]);

  return <LoadingScreen />;
};


function AppRoutes() {
  const location = useLocation();
  const { isLoaded } = useAuth();
  
  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/" element={<CyberpunkLoginEnhanced />} />
        <Route path="/register" element={<CyberpunkRegistration />} />
        <Route path="/verify-email" element={<CyberpunkVerification />} />
        <Route path="/sso-callback" element={<SSOCallback />} />
        
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard /> 
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey="your_publishable_key">
      <Router>
        <AppRoutes />
      </Router>
    </ClerkProvider>
  );
}

export default App;