import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Package } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, 'admin'); 
    navigate('/dashboard');
  };

  return (
    // Container Utama: Flexrow agar bisa bagi 2 kolom, min-h-screen agar full layar
    <div className="min-h-screen flex w-full bg-white">
      
      {/* BAGIAN KIRI: Form Login */}
      {/* w-full di mobile, w-1/2 di desktop */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header Form */}
          <div className="text-left">
            <div className="flex items-center gap-2 text-primary font-bold text-2xl mb-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Package size={28} className="text-primary" />
              </div>
              InvManage
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mt-6">Selamat Datang Kembali</h2>
            <p className="text-gray-500 mt-2">Masukan kredensial Anda untuk mengakses dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-5">
              
              {/* Input Email dengan Ikon */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="admin@inventory.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Input Password dengan Ikon */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input 
                    type="password" 
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Ingat saya</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-blue-800">Lupa password?</a>
              </div>
            </div>

            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-lg shadow-blue-500/30">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowRight size={20} className="text-blue-300 group-hover:text-blue-100" />
              </span>
              Masuk ke Sistem
            </button>
          </form>

          <p className="mt-2 text-center text-sm text-gray-600">
            Belum punya akun?{' '}
            <a href="#" className="font-medium text-primary hover:text-blue-800">Hubungi Administrator</a>
          </p>
        </div>
      </div>

      {/* BAGIAN KANAN: Gambar / Dekorasi */}
      {/* Hidden di mobile (hidden), Muncul di layar md keatas (md:flex) */}
      <div className="hidden md:flex w-1/2 bg-slate-50 relative overflow-hidden items-center justify-center">
        {/* Background Pattern Decorative */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-900 opacity-90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Warehouse" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Content diatas gambar */}
        <div className="relative z-20 text-white px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Kelola Inventori Lebih Efisien</h2>
          <p className="text-lg text-blue-100 leading-relaxed">
            Sistem manajemen stok terintegrasi untuk memantau barang masuk, keluar, dan pelaporan real-time dalam satu dashboard.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;