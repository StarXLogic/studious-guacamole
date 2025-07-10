import { Routes, Route, Navigate } from "react-router-dom";
import CultureLearningPage from "@/pages/CultureLearningPage";
import Home from "@/pages/Home";
import ARPaintingPage from "@/pages/ARPaintingPage";
import CommunityGalleryPage from "@/pages/CommunityGalleryPage";
import IntegrityCulturePage from "@/pages/IntegrityCulturePage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/culture-learning" element={<CultureLearningPage />} />
        <Route path="/culture" element={<Navigate to="/culture-learning" replace />} />
        <Route path="/integrity" element={<IntegrityCulturePage />} />
        <Route path="/integrity-culture" element={<IntegrityCulturePage />} />
      </Routes>
    </AuthContext.Provider>
  );
}
