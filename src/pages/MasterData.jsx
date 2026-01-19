import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit, Trash2, Filter, 
  Box, Users, Ruler, LayoutGrid, List, 
  X, Phone, MapPin, Package, Building2
} from 'lucide-react';

// --- DATA DUMMY ---
const initialItems = [
  { id: 1, code: 'BRG001', name: 'Laptop Asus ROG', category: 'Elektronik', unit: 'Unit', buyPrice: 15000000, sellPrice: 17500000, stock: 12, status: 'Aktif' },
  { id: 2, code: 'BRG002', name: 'Mouse Logitech', category: 'Aksesoris', unit: 'Pcs', buyPrice: 150000, sellPrice: 250000, stock: 55, status: 'Aktif' },
  { id: 3, code: 'BRG003', name: 'Kertas A4', category: 'ATK', unit: 'Rim', buyPrice: 45000, sellPrice: 55000, stock: 0, status: 'Nonaktif' },
  { id: 4, code: 'BRG004', name: 'Monitor Samsung', category: 'Elektronik', unit: 'Unit', buyPrice: 2000000, sellPrice: 2450000, stock: 5, status: 'Aktif' },
];

const initialTenants = [
  { id: 1, name: 'PT. Teknologi Maju', type: 'Supplier', contact: '08123456789', address: 'Jl. Sudirman No. 45, Jakarta Pusat', status: 'Aktif' },
  { id: 2, name: 'Toko Cabang Bandung', type: 'Mitra', contact: '08198765432', address: 'Jl. Asia Afrika, Bandung', status: 'Aktif' },
  { id: 3, name: 'Warung Bu Susi', type: 'Penyewa', contact: '08567891234', address: 'Kantin Lt. 1 Gedung A', status: 'Nonaktif' },
  { id: 4, name: 'CV. Berkah Abadi', type: 'Supplier', contact: '081122334455', address: 'Kawasan Industri Pulogadung', status: 'Aktif' },
];

const initialUnits = [
  { id: 1, name: 'Pcs', status: 'Aktif' },
  { id: 2, name: 'Unit', status: 'Aktif' },
  { id: 3, name: 'Rim', status: 'Aktif' },
  { id: 4, name: 'Box', status: 'Aktif' },
  { id: 5, name: 'Kg', status: 'Aktif' },
  { id: 6, name: 'Liter', status: 'Aktif' },
  { id: 7, name: 'Pack', status: 'Aktif' },
];

const MasterData = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('items'); 
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  
  // Data State
  const [items, setItems] = useState(initialItems);
  const [tenants, setTenants] = useState(initialTenants);
  const [units, setUnits] = useState(initialUnits);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setSearchQuery('');
    setFormData({});
  }, [activeTab]);

  // --- HANDLERS ---
  const handleOpenModal = (mode, data = null) => {
    setModalMode(mode);
    if (mode === 'edit' && data) {
      setFormData(data);
    } else {
      // Reset Default Values
      if (activeTab === 'items') setFormData({ code: '', name: '', category: 'Elektronik', unit: units[0]?.name || '', buyPrice: 0, sellPrice: 0, stock: 0, status: 'Aktif' });
      if (activeTab === 'tenants') setFormData({ name: '', type: 'Supplier', contact: '', address: '', status: 'Aktif' });
      if (activeTab === 'units') setFormData({ name: '', status: 'Aktif' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) return alert("Nama wajib diisi!");
    
    const updateList = (currentList, setList) => {
      if (modalMode === 'create') setList([...currentList, { ...formData, id: Date.now() }]);
      else setList(currentList.map(item => item.id === formData.id ? formData : item));
    };

    if (activeTab === 'items') updateList(items, setItems);
    if (activeTab === 'tenants') updateList(tenants, setTenants);
    if (activeTab === 'units') updateList(units, setUnits);

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Yakin hapus data ini?")) return;
    if (activeTab === 'items') setItems(items.filter(i => i.id !== id));
    if (activeTab === 'tenants') setTenants(tenants.filter(t => t.id !== id));
    if (activeTab === 'units') setUnits(units.filter(u => u.id !== id));
  };

  const getFilteredData = () => {
    const q = searchQuery.toLowerCase();
    if (activeTab === 'items') return items.filter(i => i.name.toLowerCase().includes(q) || i.code.toLowerCase().includes(q));
    if (activeTab === 'tenants') return tenants.filter(t => t.name.toLowerCase().includes(q));
    if (activeTab === 'units') return units.filter(u => u.name.toLowerCase().includes(q));
    return [];
  };

  const data = getFilteredData();

  // --- UI COMPONENTS ---

  const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
      status === 'Aktif' 
        ? 'bg-green-50 text-green-600 border-green-200' 
        : 'bg-gray-50 text-gray-500 border-gray-200'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'Aktif' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
      {status}
    </span>
  );

  // --- GRID VIEW RENDERER ---
  const RenderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {data.map((item) => (
        <div key={item.id} className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col h-full">
          
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button onClick={() => handleOpenModal('edit', item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Edit size={14}/></button>
            <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 size={14}/></button>
          </div>

          {activeTab === 'items' && (
            <>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center text-primary mb-4 shadow-inner">
                <Box size={24} />
              </div>
              <div className="mb-4 flex-1">
                <h3 className="font-bold text-gray-800 text-lg truncate" title={item.name}>{item.name}</h3>
                <p className="text-xs text-gray-500 font-mono mt-1 bg-gray-50 inline-block px-1.5 py-0.5 rounded">{item.code}</p>
              </div>
              <div className="space-y-2 border-t border-gray-50 pt-3 mt-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Harga</span>
                  <span className="font-bold text-gray-800">Rp {item.sellPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Stok</span>
                  <span className={`font-medium ${item.stock < 10 ? 'text-red-500' : 'text-gray-700'}`}>{item.stock} {item.unit}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">{item.category}</span>
                <StatusBadge status={item.status} />
              </div>
            </>
          )}

          {activeTab === 'tenants' && (
            <>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${item.type === 'Supplier' ? 'bg-purple-500' : 'bg-orange-500'}`}>
                  {item.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-gray-800 truncate" title={item.name}>{item.name}</h3>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.type}</span>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600 flex-1">
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-gray-400 shrink-0"/> <span className="truncate">{item.contact}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0"/> <span className="line-clamp-2 text-xs h-8">{item.address}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-right mt-auto">
                <StatusBadge status={item.status} />
              </div>
            </>
          )}

           {activeTab === 'units' && (
             <div className="flex flex-col h-full justify-between">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-50 p-2.5 rounded-lg text-green-600"><Ruler size={20}/></div>
                  <span className="font-bold text-lg text-gray-800">{item.name}</span>
                </div>
                <div className="border-t border-gray-50 pt-3 flex justify-end">
                    <StatusBadge status={item.status} />
                </div>
             </div>
           )}
        </div>
      ))}
    </div>
  );

  // --- LIST VIEW RENDERER ---
  const RenderListView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full overflow-hidden flex flex-col">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm text-gray-600 min-w-full">
          <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-xs border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 w-16 text-center">No</th>
              
              {activeTab === 'items' && <>
                <th className="px-6 py-4">Data Utama</th>
                <th className="px-6 py-4 w-[15%]">Kategori</th>
                <th className="px-6 py-4 w-[15%] text-right">Harga Jual</th>
                <th className="px-6 py-4 w-[10%] text-center">Stok</th>
              </>}

              {activeTab === 'tenants' && <>
                <th className="px-6 py-4 w-[30%]">Data Tenant</th>
                <th className="px-6 py-4 w-[40%]">Kontak Info</th>
              </>}

              {activeTab === 'units' && <>
                <th className="px-6 py-4 w-[60%]">Nama Satuan</th>
              </>}

              <th className="px-6 py-4 text-center w-[10%]">Status</th>
              <th className="px-6 py-4 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item, idx) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition duration-150 group">
                <td className="px-6 py-4 text-center text-gray-400 font-medium">{idx + 1}</td>
                
                {/* 1. BARANG */}
                {activeTab === 'items' && <>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded text-primary"><Box size={16}/></div>
                      <div>
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{item.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{item.category}</span></td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-gray-700">Rp {item.sellPrice.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-bold ${item.stock < 10 ? 'text-red-500' : 'text-gray-700'}`}>{item.stock}</span> <span className="text-xs text-gray-400">{item.unit}</span>
                  </td>
                </>}

                {/* 2. TENANT */}
                {activeTab === 'tenants' && <>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded text-purple-600"><Building2 size={16}/></div>
                      <div>
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2"><Phone size={12} className="text-gray-400"/> {item.contact}</div>
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-gray-400 shrink-0"/> 
                        <span className="truncate block">{item.address}</span>
                      </div>
                    </div>
                  </td>
                </>}

                {/* 3. UNITS */}
                {activeTab === 'units' && <>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded text-green-600"><Ruler size={16}/></div>
                      <span className="font-bold text-gray-800">{item.name}</span>
                    </div>
                  </td>
                </>}

                <td className="px-6 py-4 text-center"><StatusBadge status={item.status} /></td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal('edit', item)} className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    // CONTAINER UTAMA (Perbaikan Layout Disini)
    <div className="h-screen overflow-auto bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 w-full">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Master Data</h2>
            <p className="text-gray-500 mt-1">Kelola data {activeTab === 'items' ? 'barang dagang' : activeTab === 'tenants' ? 'mitra & supplier' : 'satuan unit'} Anda.</p>
          </div>
          <button onClick={() => handleOpenModal('create')} className="bg-primary hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 font-semibold transition hover:-translate-y-0.5 active:translate-y-0">
            <Plus size={20} /> 
            Tambah {activeTab === 'items' ? 'Barang' : activeTab === 'tenants' ? 'Tenant' : 'Satuan'}
          </button>
        </div>

        {/* CONTROLS BAR (Tabs & Search) */}
        <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex flex-col xl:flex-row justify-between gap-4 w-full items-center">
          
          {/* Tabs */}
          <div className="flex p-1.5 bg-gray-100 rounded-xl w-full xl:w-auto overflow-x-auto no-scrollbar">
            {[
              { id: 'items', label: 'Barang', icon: Package },
              { id: 'tenants', label: 'Tenant', icon: Users },
              { id: 'units', label: 'Satuan', icon: Ruler },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-white text-primary shadow-md ring-1 ring-gray-100' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & View Toggle */}
          <div className="flex gap-3 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari data..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-primary/20 rounded-xl text-sm focus:ring-4 focus:ring-primary/10 focus:bg-white transition outline-none"
              />
            </div>
            <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200">
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-primary' : 'text-gray-400 hover:text-gray-600'}`}><List size={20}/></button>
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-primary' : 'text-gray-400 hover:text-gray-600'}`}><LayoutGrid size={20}/></button>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 w-full min-h-[400px]">
          {data.length > 0 ? (
            viewMode === 'grid' ? <RenderGridView /> : <RenderListView />
          ) : (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-dashed border-gray-300 w-full">
              <div className="bg-gray-50 p-6 rounded-full mb-4">
                <Search size={48} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Tidak ada data</h3>
              <p className="text-gray-500">Silakan tambahkan data baru.</p>
            </div>
          )}
        </div>

        {/* --- MODAL FORM --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                  {modalMode === 'create' ? <Plus size={20} className="text-primary"/> : <Edit size={20} className="text-blue-500"/>}
                  {modalMode === 'create' ? 'Tambah Data' : 'Edit Data'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 bg-white p-2 rounded-full shadow-sm hover:shadow transition"><X size={20}/></button>
              </div>
              
              <form onSubmit={handleSave} className="p-8 space-y-5">
                
                {/* ITEMS FORM */}
                {activeTab === 'items' && (
                  <>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">Kode</label>
                        <input disabled={modalMode==='edit'} value={formData.code} onChange={e=>setFormData({...formData, code:e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-primary/10 outline-none bg-gray-50" placeholder="BRG-xxx"/>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">Kategori</label>
                        <select value={formData.category} onChange={e=>setFormData({...formData, category:e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none bg-white">
                          <option>Elektronik</option><option>Aksesoris</option><option>ATK</option><option>Makanan</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">Nama Barang</label>
                      <input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-primary/10 outline-none"/>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase">Harga Jual</label>
                          <input type="number" value={formData.sellPrice} onChange={e=>setFormData({...formData, sellPrice:Number(e.target.value)})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-4 focus:ring-primary/10"/>
                      </div>
                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase">Stok</label>
                          <input type="number" value={formData.stock} onChange={e=>setFormData({...formData, stock:Number(e.target.value)})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-4 focus:ring-primary/10"/>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">Satuan</label>
                        <select value={formData.unit} onChange={e=>setFormData({...formData, unit:e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none bg-white">
                          {units.map(u=><option key={u.id} value={u.name}>{u.name}</option>)}
                        </select>
                    </div>
                  </>
                )}

                {/* TENANTS FORM */}
                {activeTab === 'tenants' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">Nama Tenant / PT</label>
                      <input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-primary/10 outline-none"/>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">Tipe</label>
                        <select value={formData.type} onChange={e=>setFormData({...formData, type:e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none bg-white">
                          <option>Supplier</option><option>Mitra</option><option>Penyewa</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">Kontak</label>
                        <input value={formData.contact} onChange={e=>setFormData({...formData, contact:e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-primary/10 outline-none" placeholder="08xxx"/>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">Alamat Lengkap</label>
                      <textarea value={formData.address} onChange={e=>setFormData({...formData, address:e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-primary/10 outline-none" rows="3"/>
                    </div>
                  </>
                )}

                {/* UNITS FORM */}
                {activeTab === 'units' && (
                   <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">Nama Satuan</label>
                      <input value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-4 focus:ring-primary/10 outline-none" placeholder="Pcs/Box/Kg"/>
                   </div>
                )}

                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
                   <select value={formData.status} onChange={e=>setFormData({...formData, status:e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none bg-white">
                      <option>Aktif</option><option>Nonaktif</option>
                   </select>
                </div>

                <div className="pt-6 flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition">Batal</button>
                  <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-500/30">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasterData;