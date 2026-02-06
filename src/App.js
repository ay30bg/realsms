import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import BuyNumbers from "./pages/BuyNumbers";
import ActiveOrder from "./pages/ActiveOrder";
import OrderHistory from "./pages/OrderHistory";
import FundWallet from "./pages/FundWallet";
import FundSuccess from "./pages/FundSuccess";
import FundCancel from "./pages/FundCancel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Support from "./pages/Support";
import OpayFund from "./pages/OpayFund";
import USDTFund from "./pages/FundWalletUSDT";

function App() {
  return (
    <Router>
      <Routes>
        {/* ================= AUTH ROUTES ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ================= PROTECTED ROUTES (Layout) ================= */}
        <Route element={<Layout />}>
          {/* Redirect example (optional) */}
          <Route path="/home" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Numbers */}
          <Route path="/buy-numbers" element={<BuyNumbers />} />
          <Route path="/active-orders" element={<ActiveOrder />} />
          <Route path="/order-history" element={<OrderHistory />} />

          {/* Wallet Funding */}
          <Route path="/fund-wallet" element={<FundWallet />} />
          <Route path="/fund-wallet/opay" element={<OpayFund />} />
          <Route path="/fund-wallet/usdt" element={<USDTFund />} />
          <Route path="/fund-success" element={<FundSuccess />} />
          <Route path="/fund-cancel" element={<FundCancel />} />

          {/* Support */}
          <Route path="/support" element={<Support />} />
        </Route>

        {/* ================= 404 FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
