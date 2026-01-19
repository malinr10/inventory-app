import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Box, ShoppingCart, FileBarChart, 
  Database, LogOut, ChevronDown, ChevronRight, Package, X 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ onClose }) => { // Terima prop onClose
  const location = useLocation();
  const { logout } = useAuth();
  const [openMenus, setOpenMenus] = useState({ inventory: true });

  const toggleMenu = (key) => {
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path) => location.pathname === path || location.search.includes(path.split('?')[1]);

  const menus = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20}/> },
    { 
      name: 'Inventaris & Stok', 
      icon: <Package size={20}/>,
      key: 'inventory',
      subMenus: [
        { name: 'Saldo Akhir (Overview)', path: '/inventory?tab=summary' },
        { name: 'Barang Masuk', path: '/inventory?tab=in' },
        { name: 'Barang Keluar', path: '/inventory?tab=out' },
        { name: 'Saldo Awal', path: '/inventory?tab=initial' },
      ]
    },
    { name: 'Laporan', path: '/reports', icon: <FileBarChart size={20}/> },
    { name: 'Master Data', path: '/master', icon: <Database size={20}/> },
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header Sidebar */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
        <div className="flex items-center gap-2 text-primary font-bold text-xl">
          <Box size={24} strokeWidth={3} />
          <span>InvManage</span>
        </div>
        {/* Tombol Close di Mobile */}
        <button onClick={onClose} className="md:hidden text-gray-500 hover:text-red-500">
          <X size={24} />
        </button>
      </div>

      {/* Menu List */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menus.map((menu, index) => (
          <div key={index}>
            {menu.subMenus ? (
              <div className="mb-1">
                <button 
                  onClick={() => toggleMenu(menu.key)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    location.pathname.includes('/inventory') 
                      ? 'bg-blue-50 text-primary font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {menu.icon}
                    <span>{menu.name}</span>
                  </div>
                  {openMenus[menu.key] ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                </button>
                
                {openMenus[menu.key] && (
                  <div className="mt-1 ml-4 border-l-2 border-gray-100 pl-3 space-y-1">
                    {menu.subMenus.map((sub, idx) => (
                      <Link
                        key={idx}
                        to={sub.path}
                        onClick={onClose} // Tutup sidebar saat klik menu di mobile
                        className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                          isActive(sub.path)
                            ? 'text-primary font-semibold bg-white shadow-sm ring-1 ring-gray-100' 
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={menu.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${
                  isActive(menu.path)
                    ? 'bg-primary text-white shadow-lg shadow-blue-500/30' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {menu.icon}
                <span className="font-medium">{menu.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-gray-100">
        <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition font-medium">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;