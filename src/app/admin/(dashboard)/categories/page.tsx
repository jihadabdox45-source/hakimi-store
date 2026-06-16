"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, X } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await fetch("/api/categories/admin").then((r) => r.json());
    if (res.success) setCategories(res.data);
    setLoading(false);
  };

  const handleAdd = async () => {
    await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, description: desc }) });
    setShowAdd(false); setName(""); setDesc(""); fetchData();
  };

  const handleEdit = async () => {
    if (!selected) return;
    await fetch(`/api/categories/${selected.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, description: desc }) });
    setShowEdit(false); setSelected(null); fetchData();
  };

  const handleDelete = async () => {
    if (!selected) return;
    await fetch(`/api/categories/${selected.id}`, { method: "DELETE" });
    setShowDelete(false); setSelected(null); fetchData();
  };

  const filtered = categories.filter((c: any) => c.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#17543A]" />
        </div>
        <button onClick={() => { setName(""); setDesc(""); setShowAdd(true); }} className="bg-[#17543A] text-white px-4 py-2 rounded-lg hover:bg-[#144a33] flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Category</button>
      </div>

      <p className="text-sm text-gray-600 mb-4">Showing {filtered.length} of {categories.length} categories</p>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr><th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Name</th><th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Description</th><th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((c: any) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-gray-500">{c.description || "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => { setSelected(c); setName(c.name); setDesc(c.description || ""); setShowEdit(true); }} className="text-green-600 hover:text-green-900"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => { setSelected(c); setShowDelete(true); }} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold">Add Category</h3><button onClick={() => setShowAdd(false)}><X className="w-5 h-5" /></button></div>
            <div className="space-y-3">
              <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Cancel</button><button onClick={handleAdd} className="px-4 py-2 bg-[#17543A] text-white rounded-lg text-sm">Add</button></div>
          </div>
        </div>
      )}

      {showEdit && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold">Edit Category</h3><button onClick={() => setShowEdit(false)}><X className="w-5 h-5" /></button></div>
            <div className="space-y-3">
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <input value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowEdit(false)} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Cancel</button><button onClick={handleEdit} className="px-4 py-2 bg-[#17543A] text-white rounded-lg text-sm">Update</button></div>
          </div>
        </div>
      )}

      {showDelete && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Delete "{selected.name}"?</h3>
            <div className="flex justify-end gap-3"><button onClick={() => setShowDelete(false)} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Cancel</button><button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Delete</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
