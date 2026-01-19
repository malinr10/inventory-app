import React from 'react';
import { Link } from 'react-router-dom';
import { Package, TrendingUp, ShieldCheck, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. NAVBAR */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="text-white h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-slate-900">Zeta Inventory</span>
            </div>
            <div>
              <Link 
                to="/dashboard" 
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                Masuk Sistem <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Sistem Manajemen Stok Terintegrasi
        </span>
        <h1 className="mt-6 text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight">
          Kelola Stok & Keuangan <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Tanpa Rumit
          </span>
        </h1>
        <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
          Solusi lengkap untuk mencatat barang masuk, keluar, stock opname, hingga laporan laba rugi secara real-time.
        </p>
        
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all">
            Coba Demo Gratis
          </Link>
          <button className="px-8 py-4 rounded-xl text-lg font-semibold text-slate-700 hover:bg-slate-50 border border-slate-200 transition-all">
            Pelajari Fitur
          </button>
        </div>
      </section>

      {/* 3. FEATURES SECTION (Berdasarkan PDF) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Fitur Unggulan</h2>
            <p className="mt-4 text-slate-600">Didesain khusus untuk kebutuhan operasional harian Anda.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Inventory */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Package className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Manajemen Inventory</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Pantau saldo awal, barang masuk, dan barang keluar secara akurat. Termasuk fitur Stock Opname.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500" /> List Item & Saldo
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500" /> Stock Opname
                </li>
              </ul>
            </div>

            {/* Card 2: Transaksi */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pencatatan Transaksi</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Input user yang mudah untuk belanja modal dan penjualan harian agar data selalu update.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500" /> Input Belanja (Modal)
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500" /> Input Penjualan
                </li>
              </ul>
            </div>

            {/* Card 3: Laporan */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Laporan & Analisa</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Otomatisasi perhitungan laba rugi dari selisih modal dan penjualan. Data transparan.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500" /> Laporan Laba Rugi
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500" /> Analisa Modal
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 PT Zeta Prakarsa Mandiri. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}