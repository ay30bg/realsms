// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import BuyNumbers from "./pages/BuyNumbers";
import ActiveOrder from "./pages/ActiveOrder";
import OrderHistory from "./pages/OrderHistory";
import FundWallet from "./pages/FundWallet";
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
        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Pages inside Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/buy-numbers" element={<BuyNumbers />} />
                <Route path="/active-orders" element={<ActiveOrder />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/fund-wallet" element={<FundWallet />} />
                <Route path="/fund-wallet/opay" element={<OpayFund />} />
                <Route path="/fund-wallet/usdt" element={<USDTFund />} />
                <Route path="/support" element={<Support />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
