"use client";
import React, { useState, useEffect } from "react";
import { Edit, Trash2, Search, X } from "lucide-react";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [discountVal, setDiscountVal] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => { fetchOffers(); }, []);

  const fetchOffers = async () => {
    const res = await fetch("/api/offers").then((r) => r.json());
    if (res.success) setOffers(res.data);
    setLoading(false);
  };

  const handleRemove = async (offer: any) => {
    await fetch(`/api/products/${offer.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ discountPrice: null }) });
    setOffers((prev) => prev.filter((p) => p.id !== offer.id));
  };

  const handleEdit = async () => {
    if (!selected) return;
    await fetch(`/api/products/${selected.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ discountPrice: discountVal ? parseFloat(discountVal) : null }) });
    setOffers((prev) => prev.map((p) => (p.id === selected.id ? { ...p, discountPrice: discountVal ? parseFloat(discountVal) : null } : p)));
    setEditModal(false);
    setSelected(null);
  };

  const filtered = offers.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-4">Manage Offers (Discounted Products)</h1>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#17543A]" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr><th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Name</th><th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Original</th><th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Discount</th><th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-8 text-gray-400">No discounted products available.</td></tr>
            ) : (
              filtered.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{offer.name}</td>
                  <td className="px-4 py-3 line-through text-gray-500">KSh{offer.price}</td>
                  <td className="px-4 py-3 text-green-600 font-bold">KSh{offer.discountPrice}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => { setSelected(offer); setDiscountVal(offer.discountPrice || ""); setEditModal(true); }} className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleRemove(offer)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editModal && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold">Edit Discount</h3><button onClick={() => setEditModal(false)}><X className="w-5 h-5" /></button></div>
            <div className="space-y-3">
              <label className="text-sm text-gray-600">Original: KSh{selected.price}</label>
              <input type="number" value={discountVal} onChange={(e) => setDiscountVal(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="New discount price" />
            </div>
            <div className="flex justify-end gap-3 mt-6"><button onClick={() => setEditModal(false)} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Cancel</button><button onClick={handleEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
