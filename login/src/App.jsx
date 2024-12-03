import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CyberpunkLoginEnhanced from './components/CyberpunkLoginEnhanced';
import CyberpunkRegistration from './components/CyberpunkRegistration';

function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<CyberpunkLoginEnhanced />} />
        <Route path="/register" element={<CyberpunkRegistration />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;