import React, { useState } from 'react';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('in'); // 'in' or 'out'

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Input Transaksi</h2>

      {/* Tab Switcher */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('in')}
          className={`pb-2 px-4 font-medium ${activeTab === 'in' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
        >
          Barang Masuk (Belanja)
        </button>
        <button 
          onClick={() => setActiveTab('out')}
          className={`pb-2 px-4 font-medium ${activeTab === 'out' ? 'text-danger border-b-2 border-danger' : 'text-gray-500'}`}
        >
          Barang Keluar (Penjualan)
        </button>
      </div>

      {/* Form Area */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-6">
          {activeTab === 'in' ? 'Form Pembelian Barang' : 'Form Penjualan Barang'}
        </h3>
        
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode Barang</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none" placeholder="Cth: BRG001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Supplier / Pelanggan</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harga Satuan</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>

          <button type="button" className={`w-full py-3 rounded-lg text-white font-semibold mt-4 ${activeTab === 'in' ? 'bg-primary hover:bg-blue-800' : 'bg-danger hover:bg-red-700'}`}>
            Simpan Transaksi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transactions;