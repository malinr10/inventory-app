import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, FileText, Database } from 'lucide-react';

export default function MainLayout() {
    const location = useLocation();

    const menuItems = [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/dashboard/inventory", label: "Inventory", icon: Package },
        { path: "/dashboard/transactions", label: "Transaksi", icon: ShoppingCart },
        { path: "/dashboard/reports", label: "Laporan", icon: FileText },
        { path: "/dashboard/master", label: "Master Data", icon: Database },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Sederhana */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 font-bold text-xl border-b border-slate-700">Zeta App</div>
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Konten Utama */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white p-4 shadow-sm mb-6 flex justify-between">
                    <h2 className="text-lg font-semibold text-gray-700">Admin Panel</h2>
                </header>
                <div className="px-6 pb-6">
                    <Outlet /> {/* Halaman akan muncul di sini */}
                </div>
            </main>
        </div>
    );
}