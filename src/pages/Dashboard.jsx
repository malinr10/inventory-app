import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Package, AlertTriangle, 
  DollarSign, Calendar, ArrowUpRight, ArrowDownRight, MoreHorizontal 
} from 'lucide-react';

// --- DATA DUMMY DASHBOARD ---
const salesData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
  { name: 'Jul', revenue: 3490, profit: 4300 },
];

const categoryData = [
  { name: 'Elektronik', value: 400 },
  { name: 'Pakaian', value: 300 },
  { name: 'Makanan', value: 300 },
  { name: 'ATK', value: 200 },
];

const recentTransactions = [
  { id: 1, item: 'Macbook Pro M2', type: 'out', qty: 1, date: '12 Mei 2024', status: 'Selesai' },
  { id: 2, item: 'Kertas A4', type: 'in', qty: 50, date: '12 Mei 2024', status: 'Pending' },
  { id: 3, item: 'Mouse Logitech', type: 'out', qty: 3, date: '11 Mei 2024', status: 'Selesai' },
  { id: 4, item: 'Samsung Monitor', type: 'out', qty: 2, date: '10 Mei 2024', status: 'Batal' },
];

const COLORS = ['#1e40af', '#3b82f6', '#93c5fd', '#e2e8f0'];

// --- KOMPONEN KARTU STATISTIK ---
const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800 group-hover:text-primary transition-colors">
          {value}
        </h3>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm">
      <span className={`flex items-center gap-1 font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {trendValue}
      </span>
      <span className="text-gray-400">vs bulan lalu</span>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Halo Admin, inilah ringkasan aktivitas toko hari ini.</p>
        </div>
        
        {/* Date Filter Mockup */}
        <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">Harian</button>
          <button className="px-4 py-1.5 text-sm font-medium text-primary bg-blue-50 rounded-md shadow-sm">Bulanan</button>
          <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">Tahunan</button>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <button className="p-1.5 text-gray-500 hover:text-primary"><Calendar size={18}/></button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Pendapatan" 
          value="Rp 124.5Jt" 
          icon={DollarSign} 
          trend="up" 
          trendValue="+12.5%" 
          color="bg-blue-600 text-blue-600" 
        />
        <StatCard 
          title="Total Transaksi" 
          value="1,294" 
          icon={TrendingUp} 
          trend="up" 
          trendValue="+8.2%" 
          color="bg-purple-600 text-purple-600" 
        />
        <StatCard 
          title="Stok Tersedia" 
          value="3,402" 
          icon={Package} 
          trend="down" 
          trendValue="-2.4%" 
          color="bg-orange-500 text-orange-500" 
        />
        <StatCard 
          title="Stok Kritis" 
          value="12 Item" 
          icon={AlertTriangle} 
          trend="down" 
          trendValue="+3 Item" 
          color="bg-red-500 text-red-500" 
        />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart (Area) - 2 Kolom */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Analisis Pendapatan & Profit</h3>
            <button className="text-gray-400 hover:text-primary"><MoreHorizontal size={20} /></button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e40af" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1e40af" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart (Pie) - 1 Kolom */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Distribusi Kategori</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text Trick */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
              <span className="text-3xl font-bold text-gray-800">1.2K</span>
              <span className="text-xs text-gray-500">Total Items</span>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT TRANSACTIONS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Transaksi Terakhir</h3>
          <button className="text-sm text-primary font-medium hover:underline">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 uppercase font-medium text-xs">
              <tr>
                <th className="px-6 py-4">Nama Barang</th>
                <th className="px-6 py-4 text-center">Tipe</th>
                <th className="px-6 py-4 text-center">Jumlah</th>
                <th className="px-6 py-4 text-center">Tanggal</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{trx.item}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      trx.type === 'in' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {trx.type === 'in' ? 'Barang Masuk' : 'Barang Keluar'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold">{trx.qty}</td>
                  <td className="px-6 py-4 text-center text-gray-500">{trx.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      trx.status === 'Selesai' ? 'bg-blue-50 text-blue-700' : 
                      trx.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        trx.status === 'Selesai' ? 'bg-blue-600' : 
                        trx.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></span>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;