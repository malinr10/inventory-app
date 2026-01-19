import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend 
} from 'recharts';
import { 
  FileText, Download, Calendar, TrendingUp, TrendingDown, 
  DollarSign, Package, PieChart, ArrowUpRight, ArrowDownRight, Filter 
} from 'lucide-react';

// --- DATA DUMMY (MOCK DATA) ---

// 1. Data Tren Penjualan & Laba (6 Bulan)
const monthlyData = [
  { name: 'Jan', revenue: 15000000, capital: 10000000, profit: 5000000 },
  { name: 'Feb', revenue: 22000000, capital: 14000000, profit: 8000000 },
  { name: 'Mar', revenue: 18000000, capital: 12000000, profit: 6000000 },
  { name: 'Apr', revenue: 28000000, capital: 17000000, profit: 11000000 },
  { name: 'May', revenue: 20000000, capital: 13000000, profit: 7000000 },
  { name: 'Jun', revenue: 35000000, capital: 21000000, profit: 14000000 },
];

// 2. Data Detail Transaksi Penjualan
const salesTransactions = [
  { id: 'INV-001', date: '2024-06-01', tenant: 'Customer Umum', items: 'Laptop ROG (1)', total: 17500000, status: 'Lunas' },
  { id: 'INV-002', date: '2024-06-02', tenant: 'PT. Teknologi Maju', items: 'Mouse (10), Keyboard (5)', total: 5500000, status: 'Lunas' },
  { id: 'INV-003', date: '2024-06-03', tenant: 'Toko Cabang Bdg', items: 'Monitor Samsung (3)', total: 7350000, status: 'Lunas' },
  { id: 'INV-004', date: '2024-06-04', tenant: 'Customer Umum', items: 'Kertas A4 (50)', total: 2750000, status: 'Pending' },
];

// 3. Data Modal & Stok Aset
const capitalAssets = [
  { id: 1, item: 'Laptop Asus ROG', stock: 5, buyPrice: 15000000, totalAsset: 75000000 },
  { id: 2, item: 'Mouse Logitech', stock: 20, buyPrice: 150000, totalAsset: 3000000 },
  { id: 3, item: 'Kertas A4', stock: 100, buyPrice: 45000, totalAsset: 4500000 },
  { id: 4, item: 'Monitor Samsung', stock: 8, buyPrice: 2000000, totalAsset: 16000000 },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState('sales'); // 'sales' | 'capital' | 'profit'
  const [dateRange, setDateRange] = useState('Bulan Ini');

  // --- FUNGSI EKSPOR KE EXCEL (CSV) ---
  const handleExport = () => {
    let dataToExport = [];
    let fileName = '';

    if (activeTab === 'sales') {
      dataToExport = salesTransactions;
      fileName = 'Laporan_Penjualan.csv';
    } else if (activeTab === 'capital') {
      dataToExport = capitalAssets;
      fileName = 'Laporan_Modal_Aset.csv';
    } else {
      dataToExport = monthlyData;
      fileName = 'Laporan_Laba_Rugi.csv';
    }

    // Konversi JSON ke CSV
    const headers = Object.keys(dataToExport[0]).join(",");
    const rows = dataToExport.map(row => Object.values(row).join(",")).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;

    // Trigger Download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- KOMPONEN KARTU RINGKASAN ---
  const SummaryCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start justify-between hover:shadow-md transition">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {subtext && <p className={`text-xs mt-2 font-medium ${subtext.includes('+') ? 'text-green-600' : 'text-red-500'}`}>{subtext}</p>}
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
  );

  // --- RENDER CONTENT ---
  return (
    <div className="h-screen overflow-auto bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Laporan Bisnis</h2>
            <p className="text-gray-500 mt-1">Analisis performa penjualan, modal, dan profitabilitas usaha.</p>
          </div>
          <div className="flex gap-3">
            {/* Filter Tanggal Mockup */}
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer hover:bg-gray-50">
              <Calendar size={18} className="text-gray-500"/>
              <span>{dateRange}</span>
            </div>
            {/* Tombol Export */}
            <button 
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-green-500/20 flex items-center gap-2 font-bold transition transform active:scale-95"
            >
              <Download size={18} /> Ekspor Excel
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm inline-flex flex-wrap gap-2 w-full md:w-auto">
          {[
            { id: 'sales', label: '6.1 Laporan Penjualan', icon: TrendingUp },
            { id: 'capital', label: '6.2 Laporan Modal', icon: Package },
            { id: 'profit', label: '6.3 Laba & Rugi', icon: PieChart },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18}/> {tab.label}
            </button>
          ))}
        </div>

        {/* --- KONTEN: LAPORAN PENJUALAN --- */}
        {activeTab === 'sales' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryCard title="Total Omzet (Revenue)" value="Rp 35.000.000" icon={DollarSign} color="bg-blue-600 text-blue-600" subtext="+12.5% vs bulan lalu" />
              <SummaryCard title="Total Transaksi" value="142 Faktur" icon={FileText} color="bg-purple-600 text-purple-600" subtext="+5% transaksi baru" />
              <SummaryCard title="Rata-rata Penjualan" value="Rp 246.000" icon={TrendingUp} color="bg-green-500 text-green-500" subtext="Per transaksi" />
            </div>

            {/* Chart & Table Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Grafik Tren Penjualan (2/3 width) */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6">Grafik Tren Penjualan (6 Bulan)</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Omzet" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tabel Ringkas (1/3 width) */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
                <h3 className="font-bold text-gray-800 mb-4">Top Produk Terlaris</h3>
                <div className="flex-1 space-y-4 overflow-auto">
                  {[
                    { name: 'Laptop Asus ROG', qty: 12, val: 'Rp 210jt' },
                    { name: 'Mouse Logitech', qty: 45, val: 'Rp 11jt' },
                    { name: 'Kertas A4', qty: 120, val: 'Rp 6.6jt' },
                    { name: 'Monitor Samsung', qty: 8, val: 'Rp 19jt' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">{idx+1}</div>
                        <div>
                          <p className="font-bold text-sm text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.qty} Terjual</p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-gray-700">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabel Detail Transaksi (Full Width) */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-800">Rincian Transaksi Keluar</h3>
                <button className="text-sm text-primary font-bold hover:underline">Lihat Semua</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-xs">
                    <tr>
                      <th className="px-6 py-4">No. Invoice</th>
                      <th className="px-6 py-4">Tanggal</th>
                      <th className="px-6 py-4">Tenant / Pembeli</th>
                      <th className="px-6 py-4">Item Barang</th>
                      <th className="px-6 py-4 text-right">Total</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {salesTransactions.map((trx, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono font-medium text-primary">{trx.id}</td>
                        <td className="px-6 py-4">{trx.date}</td>
                        <td className="px-6 py-4 font-bold text-gray-800">{trx.tenant}</td>
                        <td className="px-6 py-4">{trx.items}</td>
                        <td className="px-6 py-4 text-right font-bold text-gray-800">Rp {trx.total.toLocaleString()}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${trx.status === 'Lunas' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
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
        )}

        {/* --- KONTEN: LAPORAN MODAL --- */}
        {activeTab === 'capital' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SummaryCard title="Total Aset Barang (Stok)" value="Rp 98.500.000" icon={Package} color="bg-orange-500 text-orange-500" subtext="Nilai stok tersisa di gudang" />
              <SummaryCard title="Total Pengeluaran (Bulan Ini)" value="Rp 21.000.000" icon={ArrowDownRight} color="bg-red-500 text-red-500" subtext="Belanja stok baru" />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                 <h3 className="font-bold text-gray-800">Analisis Nilai Aset Stok (Modal Tertanam)</h3>
                 <p className="text-sm text-gray-500 mt-1">Nilai aset dihitung berdasarkan Harga Beli x Sisa Stok.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-xs">
                    <tr>
                      <th className="px-6 py-4">Nama Barang</th>
                      <th className="px-6 py-4 text-center">Sisa Stok</th>
                      <th className="px-6 py-4 text-right">Harga Beli (HPP)</th>
                      <th className="px-6 py-4 text-right">Total Nilai Aset</th>
                      <th className="px-6 py-4 text-center">Status Stok</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {capitalAssets.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold text-gray-800">{item.item}</td>
                        <td className="px-6 py-4 text-center">{item.stock} Unit</td>
                        <td className="px-6 py-4 text-right text-gray-500">Rp {item.buyPrice.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-bold text-gray-900 bg-orange-50/30">Rp {item.totalAsset.toLocaleString()}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {item.stock > 10 ? 'Aman' : 'Menipis'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- KONTEN: LABA & RUGI --- */}
        {activeTab === 'profit' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg shadow-green-600/20">
                <p className="text-green-100 font-medium mb-1">Total Laba Bersih (Bulan Ini)</p>
                <h3 className="text-3xl font-bold">Rp 14.000.000</h3>
                <p className="text-sm mt-3 bg-white/20 inline-block px-2 py-1 rounded-lg">+18% dari bulan lalu</p>
              </div>
              <SummaryCard title="Total Penjualan" value="Rp 35.000.000" icon={ArrowUpRight} color="bg-blue-600 text-blue-600" />
              <SummaryCard title="Total Modal (HPP)" value="Rp 21.000.000" icon={ArrowDownRight} color="bg-gray-600 text-gray-600" />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div>
                   <h3 className="font-bold text-gray-800 text-lg">Analisis Profitabilitas (Laba vs Modal)</h3>
                   <p className="text-gray-500 text-sm">Perbandingan antara Omzet (Biru) dan Modal (Abu-abu) per bulan.</p>
                </div>
                <div className="flex gap-4 text-sm font-medium">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-full"></div> Omzet</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-400 rounded-full"></div> Modal</div>
                </div>
              </div>
              
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                    <Tooltip 
                      cursor={{fill: '#f9fafb'}}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" name="Penjualan" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="capital" name="Modal (HPP)" fill="#9ca3af" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-800 mb-4">Ringkasan Kinerja</h3>
               <p className="text-gray-600 leading-relaxed">
                 Berdasarkan data bulan Juni, bisnis mencatatkan <span className="font-bold text-green-600">Laba Bersih sebesar Rp 14.000.000</span> dengan margin keuntungan sekitar <strong>40%</strong>. Tren penjualan menunjukkan kenaikan signifikan dibanding bulan Mei, didorong oleh peningkatan volume transaksi pada kategori Elektronik.
               </p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;