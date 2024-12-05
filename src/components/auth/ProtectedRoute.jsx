// src/components/auth/ProtectedRoute.jsx
import { useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingScreen from '../ui/LoadingScreen';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  console.log("Protected Route - isLoaded:", isLoaded, "isSignedIn:", isSignedIn);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  if (!isSignedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;