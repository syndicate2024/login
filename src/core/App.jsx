import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { ClerkProvider } from "@clerk/clerk-react";
import { config } from './config';
import { 
  CyberpunkLoginEnhanced,
  CyberpunkRegistration,
  CyberpunkVerification,
  ProtectedRoute 
} from '../features/auth/components';
import Dashboard from '../features/dashboard/components/Dashboard';

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

// SSO Callback component
const SSOCallback = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      if (!isLoaded) return;

      console.log("SSO Callback - Auth State:", { 
        isLoaded, 
        isSignedIn,
        hasError: location.state?.error,
        searchParams: location.search
      });

      try {
        if (isSignedIn) {
          console.log("User is signed in, redirecting to dashboard");
          navigate(config.routes.dashboard, { replace: true });
        } else {
          console.log("Sign in failed, redirecting to login");
          navigate(config.routes.home, { 
            replace: true,
            state: { 
              error: 'Social login failed. Please try again.' 
            }
          });
        }
      } catch (error) {
        console.error("SSO Callback error:", error);
        navigate(config.routes.home, {
          replace: true,
          state: {
            error: error.message || 'Authentication failed. Please try again.'
          }
        });
      }
    };

    handleCallback();
  }, [isLoaded, isSignedIn, navigate, location]);

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
        <Route path={config.routes.home} element={<CyberpunkLoginEnhanced />} />
        <Route path={config.routes.register} element={<CyberpunkRegistration />} />
        <Route path={config.routes.verifyEmail} element={<CyberpunkVerification />} />
        <Route path={config.routes.ssoCallback} element={<SSOCallback />} />
        
        {/* Protected routes */}
        <Route
          path={config.routes.dashboard}
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
  console.log("Initializing app with Clerk key:", config.clerkPublishableKey.substring(0, 10) + "...");

  return (
    <ClerkProvider publishableKey={config.clerkPublishableKey}>
      <Router>
        <AppRoutes />
      </Router>
    </ClerkProvider>
  );
}

export default App;