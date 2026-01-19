import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Plus, Save, Trash2, Calendar, User, 
  ArrowUpRight, ArrowDownRight, History, Package, AlertCircle, ShoppingCart
} from 'lucide-react';

// --- DATA DUMMY ---
const mockItems = [
  { id: 1, code: 'BRG001', name: 'Laptop Asus ROG', initialStock: 5, price: 17500000 },
  { id: 2, code: 'BRG002', name: 'Mouse Logitech', initialStock: 20, price: 250000 },
  { id: 3, code: 'BRG003', name: 'Kertas A4', initialStock: 100, price: 55000 },
];
const mockTenants = ['PT. Teknologi Maju', 'Toko Cabang Bandung', 'Customer Umum'];

const Inventory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getTabFromUrl = () => new URLSearchParams(location.search).get('tab') || 'summary';
  const activeTab = getTabFromUrl();

  const [items, setItems] = useState(mockItems);
  const [transactions, setTransactions] = useState([]); 
  const [trxForm, setTrxForm] = useState({
    date: new Date().toISOString().split('T')[0],
    tenant: '',
    cart: []
  });
  const [selectedItem, setSelectedItem] = useState({ id: '', qty: 1 });

  // --- LOGIC ---
  const getStockData = () => {
    return items.map(item => {
      const inQty = transactions.filter(t => t.type === 'in' && t.itemId === item.id).reduce((sum, t) => sum + t.qty, 0);
      const outQty = transactions.filter(t => t.type === 'out' && t.itemId === item.id).reduce((sum, t) => sum + t.qty, 0);
      return { ...item, in: inQty, out: outQty, finalStock: item.initialStock + inQty - outQty };
    });
  };
  const stockData = getStockData();

  const handleTabChange = (tabName) => {
    navigate(`/inventory?tab=${tabName}`);
    setTrxForm({ date: new Date().toISOString().split('T')[0], tenant: '', cart: [] });
    setSelectedItem({ id: '', qty: 1 });
  };

  const handleAddToCart = () => {
    if (!selectedItem.id || selectedItem.qty <= 0) return alert("Pilih barang valid!");
    const itemRef = items.find(i => i.id === parseInt(selectedItem.id));
    if (activeTab === 'out') {
      const current = stockData.find(i => i.id === itemRef.id);
      if (selectedItem.qty > current.finalStock) return alert(`Stok kurang! Sisa: ${current.finalStock}`);
    }
    const newItem = {
      itemId: itemRef.id,
      itemName: itemRef.name,
      qty: parseInt(selectedItem.qty),
      price: itemRef.price,
      total: itemRef.price * parseInt(selectedItem.qty)
    };
    setTrxForm(prev => ({ ...prev, cart: [...prev.cart, newItem] }));
    setSelectedItem({ id: '', qty: 1 });
  };

  const handleRemoveFromCart = (idx) => {
    const newCart = [...trxForm.cart];
    newCart.splice(idx, 1);
    setTrxForm(prev => ({ ...prev, cart: newCart }));
  };

  const handleSaveTransaction = () => {
    if (!trxForm.tenant || trxForm.cart.length === 0) return alert("Data belum lengkap!");
    const newTransactions = trxForm.cart.map(c => ({
      id: Date.now() + Math.random(),
      date: trxForm.date,
      tenant: trxForm.tenant,
      type: activeTab,
      itemId: c.itemId,
      qty: c.qty,
      price: c.price,
      total: c.total
    }));
    setTransactions([...transactions, ...newTransactions]);
    handleTabChange('summary');
  };

  // --- RENDER TABLES ---
  const RenderStockTable = ({ isEditable }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600 min-w-[600px]"> {/* min-w agar tidak gepeng di HP */}
          <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-xs border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Barang</th>
              <th className="px-6 py-4 text-center">Saldo Awal</th>
              {!isEditable && <>
                <th className="px-6 py-4 text-center text-green-600">Masuk</th>
                <th className="px-6 py-4 text-center text-red-600">Keluar</th>
                <th className="px-6 py-4 text-center bg-blue-50/30 text-gray-800">Saldo Akhir</th>
              </>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stockData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="font-bold text-gray-800 block">{item.name}</span>
                  <span className="text-xs text-gray-400 font-mono">{item.code}</span>
                </td>
                <td className="px-6 py-4 text-center font-medium">{item.initialStock}</td>
                {!isEditable && <>
                  <td className="px-6 py-4 text-center text-green-600">+{item.in}</td>
                  <td className="px-6 py-4 text-center text-red-600">-{item.out}</td>
                  <td className="px-6 py-4 text-center font-bold text-lg bg-blue-50/30">{item.finalStock}</td>
                </>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- RENDER FORM (Grid System diperbaiki) ---
  const RenderTransactionForm = ({ type }) => (
    // Grid Responsif: 1 kolom di HP, 3 kolom di Desktop
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* KIRI: INPUT FORM */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
            {type === 'in' ? <ArrowDownRight className="text-green-600"/> : <ArrowUpRight className="text-red-600"/>}
            Input {type === 'in' ? 'Pembelian' : 'Penjualan'}
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Tanggal</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-3 text-gray-400"/>
                <input 
                  type="date" 
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm"
                  value={trxForm.date}
                  onChange={(e) => setTrxForm({...trxForm, date: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">
                {type === 'in' ? 'Supplier' : 'Pembeli'}
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-gray-400"/>
                <select 
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm bg-white"
                  value={trxForm.tenant}
                  onChange={(e) => setTrxForm({...trxForm, tenant: e.target.value})}
                >
                  <option value="">-- Pilih Partner --</option>
                  {mockTenants.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Item Barang</label>
              <select 
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none bg-white mb-2"
                value={selectedItem.id}
                onChange={(e) => setSelectedItem({...selectedItem, id: e.target.value})}
              >
                <option value="">Pilih Barang...</option>
                {items.map(i => (
                  <option key={i.id} value={i.id}>{i.name} (Stok: {stockData.find(s => s.id === i.id)?.finalStock})</option>
                ))}
              </select>
              <div className="flex gap-2">
                 <input 
                  type="number" 
                  min="1"
                  placeholder="Qty"
                  className="w-20 border border-gray-300 rounded-xl px-2 py-2 text-sm text-center outline-none"
                  value={selectedItem.qty}
                  onChange={(e) => setSelectedItem({...selectedItem, qty: e.target.value})}
                />
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-900 hover:bg-black text-white py-2 rounded-xl text-sm font-bold transition shadow-md"
                >
                  + Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KANAN: CART (KERANJANG) */}
      <div className="lg:col-span-2 flex flex-col">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full min-h-[400px]">
          {/* Header Cart */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <ShoppingCart size={20} className="text-primary"/> Daftar Barang
            </h3>
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-primary rounded-full">
              {trxForm.cart.length} Item
            </span>
          </div>

          {/* Body Cart (Scrollable) */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[500px]">
            {trxForm.cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4 py-10">
                <Package size={64} strokeWidth={1}/>
                <p className="text-gray-400 font-medium">Keranjang masih kosong</p>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase border-b border-gray-100">
                  <tr>
                    <th className="pb-3 pl-2">Produk</th>
                    <th className="pb-3 text-center">Qty</th>
                    <th className="pb-3 text-right">Total</th>
                    <th className="pb-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {trxForm.cart.map((item, idx) => (
                    <tr key={idx} className="group hover:bg-gray-50/80">
                      <td className="py-4 pl-2 font-medium text-gray-800">{item.itemName}</td>
                      <td className="py-4 text-center text-gray-600">{item.qty}</td>
                      <td className="py-4 text-right font-bold text-gray-800">Rp {item.total.toLocaleString()}</td>
                      <td className="py-4 text-center">
                        <button onClick={() => handleRemoveFromCart(idx)} className="text-gray-400 hover:text-red-500 transition">
                          <Trash2 size={16}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer Cart (Total & Action) */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Total Transaksi</p>
                <p className="text-2xl font-extrabold text-gray-900">
                  Rp {trxForm.cart.reduce((a, b) => a + b.total, 0).toLocaleString()}
                </p>
              </div>
              <button 
                onClick={handleSaveTransaction}
                disabled={trxForm.cart.length === 0}
                className="w-full sm:w-auto bg-primary hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Save size={18}/> Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* HEADER PAGE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Inventaris & Stok</h2>
          <p className="text-gray-500 text-sm">Kontrol stok barang secara real-time.</p>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 pb-2">
        {[
          { id: 'summary', label: 'Overview Stok', icon: History, color: 'bg-primary' },
          { id: 'in', label: 'Barang Masuk', icon: ArrowDownRight, color: 'bg-green-600' },
          { id: 'out', label: 'Barang Keluar', icon: ArrowUpRight, color: 'bg-red-600' },
          { id: 'initial', label: 'Saldo Awal', icon: AlertCircle, color: 'bg-orange-500' },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition border ${
              activeTab === tab.id 
                ? `${tab.color} text-white border-transparent shadow-md` 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={16}/> {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[400px]">
        {activeTab === 'summary' && <RenderStockTable isEditable={false} />}
        {activeTab === 'initial' && (
          <div className="space-y-4">
            <div className="bg-orange-50 text-orange-800 p-4 rounded-xl flex gap-3 text-sm border border-orange-100">
              <AlertCircle size={20} className="shrink-0"/>
              <p>Perubahan Saldo Awal akan mereset kalkulasi stok. Gunakan dengan hati-hati.</p>
            </div>
            <RenderStockTable isEditable={true} />
          </div>
        )}
        {(activeTab === 'in' || activeTab === 'out') && <RenderTransactionForm type={activeTab} />}
      </div>
    </div>
  );
};

export default Inventory;