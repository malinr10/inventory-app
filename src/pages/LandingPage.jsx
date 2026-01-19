import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  BarChart3, 
  Box, 
  ShieldCheck, 
  Zap, 
  Layers 
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-primary">
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <Box size={24} strokeWidth={3} />
            </div>
            <span>InvManage</span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-primary transition">Fitur</a>
            <a href="#benefits" className="hover:text-primary transition">Keunggulan</a>
            <a href="#pricing" className="hover:text-primary transition">Harga</a>
          </div>

          <div className="flex gap-4">
            <Link 
              to="/login" 
              className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-primary hover:bg-blue-800 transition shadow-lg shadow-blue-500/30"
            >
              Masuk / Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-16 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-bold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Versi 2.0 Telah Rilis
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Kelola Stok Barang <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Tanpa Hambatan
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Platform manajemen inventori all-in-one untuk memantau stok, analisis penjualan, dan laporan keuangan secara real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-blue-800 transition shadow-xl hover:-translate-y-1">
                Mulai Sekarang
                <ArrowRight size={20} />
              </Link>
              <a href="#features" className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition">
                Pelajari Fitur
              </a>
            </div>

            <div className="pt-8 flex items-center gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" /> Free Trial 14 Hari
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" /> Tanpa Kartu Kredit
              </div>
            </div>
          </div>

          {/* Hero Image / Dashboard Preview */}
          <div className="relative">
            {/* Decorative Blobs */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 overflow-hidden transform rotate-2 hover:rotate-0 transition duration-500">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80" 
                alt="Dashboard Preview" 
                className="rounded-xl w-full"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg border border-gray-100 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full text-green-600">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Profit</p>
                  <p className="text-lg font-bold text-gray-800">+24%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fitur Lengkap untuk Bisnis Anda</h2>
            <p className="text-gray-600 text-lg">Semua yang Anda butuhkan untuk mengelola gudang dan toko ada di satu tempat.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: <Box size={32} />,
                title: "Manajemen Stok",
                desc: "Pantau stok masuk dan keluar secara akurat dengan notifikasi stok menipis otomatis.",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                icon: <BarChart3 size={32} />,
                title: "Laporan Real-time",
                desc: "Analisis grafik penjualan, keuntungan, dan performa produk dalam satu dashboard.",
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              {
                icon: <Zap size={32} />,
                title: "Transaksi Cepat",
                desc: "Catat pembelian dan penjualan dengan antarmuka yang cepat dan mudah digunakan.",
                color: "text-yellow-600",
                bg: "bg-yellow-50"
              },
              {
                icon: <ShieldCheck size={32} />,
                title: "Keamanan Data",
                desc: "Data tersimpan aman di cloud dengan enkripsi tingkat tinggi dan backup harian.",
                color: "text-green-600",
                bg: "bg-green-50"
              },
              {
                icon: <Layers size={32} />,
                title: "Multi-Gudang",
                desc: "Kelola stok di berbagai lokasi gudang atau cabang toko yang berbeda.",
                color: "text-red-600",
                bg: "bg-red-50"
              },
              {
                icon: <CheckCircle size={32} />,
                title: "Stock Opname",
                desc: "Fitur khusus untuk melakukan penyesuaian stok fisik dan sistem dengan mudah.",
                color: "text-cyan-600",
                bg: "bg-cyan-50"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 group">
                <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Mengoptimalkan Bisnis Anda?</h2>
          <p className="text-blue-100 text-lg mb-10">Bergabunglah dengan ribuan pemilik bisnis yang telah beralih ke InvManage.</p>
          <Link 
            to="/login"
            className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Coba Gratis Sekarang
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-2xl text-white mb-4">
              <Box size={24} />
              <span>InvManage</span>
            </div>
            <p className="max-w-xs text-sm">
              Solusi terbaik untuk manajemen inventori modern. Cepat, Aman, dan Terpercaya.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Produk</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Fitur</a></li>
              <li><a href="#" className="hover:text-white">Harga</a></li>
              <li><a href="#" className="hover:text-white">Studi Kasus</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white">Kontak</a></li>
              <li><a href="#" className="hover:text-white">Karir</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          &copy; {new Date().getFullYear()} InvManage System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;