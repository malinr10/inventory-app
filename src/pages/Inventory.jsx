import React from 'react';

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Inventory Barang</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + Stock Opname
        </button>
      </div>

      {/* Tabel Sederhana */}
      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3">Nama Barang</th>
              <th className="p-3 text-right">Awal</th>
              <th className="p-3 text-right text-green-600">Masuk</th>
              <th className="p-3 text-right text-red-600">Keluar</th>
              <th className="p-3 text-right font-bold">Akhir</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="p-3">Kabel LAN 10m</td>
              <td className="p-3 text-right">50</td>
              <td className="p-3 text-right">10</td>
              <td className="p-3 text-right">5</td>
              <td className="p-3 text-right font-bold">55</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}