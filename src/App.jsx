import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage'; // Import Landing Page

// Pages
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import MasterData from './pages/MasterData';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route Publik: Landing Page di akar (root) */}
        <Route path="/" element={<LandingPage />} />

        {/* Route Aplikasi: Semua yang ada di dalam /dashboard */}
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="master" element={<MasterData />} />
        </Route>

        {/* Redirect jika user nyasar */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}