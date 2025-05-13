import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { AccountPage } from "./pages/AccountPage";
import { CartPage } from "./pages/CartPage";
import { WishlistPage } from "./pages/WishlistPage";
import { PaymentPage } from "./pages/PaymentPage";

// Auth check as a hook
const useAuth = () => localStorage.getItem("isAuthenticated") === "true";

// Layout with conditional Header
const Layout = () => {
  const location = useLocation();
  const isAuthenticated = useAuth();
  const hideHeaderRoutes = ["/login", "/register"];
  const showHeader = isAuthenticated && !hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100">
      {showHeader && <Header />}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

// Protected route wrapper
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  return useAuth() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes under Layout */}
        <Route element={<RequireAuth><Layout /></RequireAuth>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<PaymentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
