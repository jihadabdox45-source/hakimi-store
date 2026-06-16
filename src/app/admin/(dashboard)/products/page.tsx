"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Percent, Search, X, Image as ImageIcon } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice: number | null;
  image: string | null;
  isActive: boolean;
  isFeatured: boolean;
  category?: { id: number; name: string } | null;
  categoryName?: string | null;
  categoryId?: number | null;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [pRes, cRes] = await Promise.all([
      fetch("/api/products/admin").then((r) => r.json()),
      fetch("/api/categories/admin").then((r) => r.json()),
    ]);
    if (pRes.success) setProducts(pRes.data);
    if (cRes.success) setCategories(cRes.data);
    setLoading(false);
  };

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [discountVal, setDiscountVal] = useState("");

  const [form, setForm] = useState({ name: "", price: "", categoryId: "", isActive: true, isFeatured: false });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async () => {
    let imageUrl = null;
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      const uploadRes = await fetch("/api/uploads", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (uploadData.success) imageUrl = uploadData.url;
    }
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, price: parseFloat(form.price), categoryId: form.categoryId ? parseInt(form.categoryId) : null, isActive: form.isActive, isFeatured: form.isFeatured, image: imageUrl }),
    });
    setShowAdd(false);
    setImageFile(null);
    setImagePreview(null);
    setForm({ name: "", price: "", categoryId: "", isActive: true, isFeatured: false });
    fetchData();
  };

  const handleEdit = async () => {
    if (!selected) return;
    let imageUrl = selected.image;
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      const uploadRes = await fetch("/api/uploads", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (uploadData.success) imageUrl = uploadData.url;
    }
    await fetch(`/api/products/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: selected.name, price: selected.price, categoryId: selected.categoryId, isActive: selected.isActive, isFeatured: selected.isFeatured, image: imageUrl }),
    });
    setShowEdit(false);
    setImageFile(null);
    setImagePreview(null);
    setSelected(null);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selected) return;
    await fetch(`/api/products/${selected.id}`, { method: "DELETE" });
    setShowDelete(false);
    setSelected(null);
    fetchData();
  };

  const handleDiscount = async () => {
    if (!selected) return;
    await fetch(`/api/products/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ discountPrice: discountVal ? parseFloat(discountVal) : null }),
    });
    setShowDiscount(false);
    setDiscountVal("");
    setSelected(null);
    fetchData();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[300px] text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17543A] text-sm" />
        </div>
        <button onClick={() => { setForm({ name: "", price: "", categoryId: "", isActive: true, isFeatured: false }); setImageFile(null); setImagePreview(null); setShowAdd(true); }}
          className="bg-[#17543A] text-white px-4 py-2 rounded-lg hover:bg-[#144a33] flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">Showing {filtered.length} of {products.length} products</p>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Image</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Category</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Price</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Discount</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase text-xs">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-400 w-5 h-5" />}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{p.name}<div className="text-gray-500 text-xs">#{p.id}</div></td>
                <td className="px-4 py-3 text-gray-500">{p.category?.name || p.categoryName || "-"}</td>
                <td className="px-4 py-3">KSh{p.price}</td>
                <td className="px-4 py-3">{p.discountPrice && p.discountPrice < p.price ? <span className="text-red-600 font-bold">KSh{p.discountPrice}</span> : "-"}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{p.isActive ? "Active" : "Inactive"}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => { setSelected(p); setImagePreview(p.image); setImageFile(null); setShowEdit(true); }} className="text-green-600 hover:text-green-900" title="Edit"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => { setSelected(p); setShowDelete(true); }} className="text-red-600 hover:text-red-900" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    <button onClick={() => { setSelected(p); setDiscountVal(p.discountPrice?.toString() || ""); setShowDiscount(true); }} className="text-yellow-600 hover:text-yellow-900" title="Discount"><Percent className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold">Add Product</h3><button onClick={() => { setShowAdd(false); setImageFile(null); setImagePreview(null); }}><X className="w-5 h-5" /></button></div>
            <div className="space-y-3">
              <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="flex items-center gap-3">
                  {imagePreview && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border">
                      <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm border">
                    Choose File
                    <input type="file" accept="image/*" onChange={(e) => handleImageSelect(e)} className="hidden" />
                  </label>
                </div>
              </div>
              <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm">
                <option value="">No category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} /> Featured</label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setShowAdd(false); setImageFile(null); setImagePreview(null); }} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-[#17543A] text-white rounded-lg text-sm">Add</button>
            </div>
          </div>
        </div>
      )}

      {showEdit && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold">Edit Product</h3><button onClick={() => { setShowEdit(false); setImageFile(null); setImagePreview(null); }}><X className="w-5 h-5" /></button></div>
            <div className="space-y-3">
              <input value={selected.name} onChange={(e) => setSelected({ ...selected, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="flex items-center gap-3">
                  {(imagePreview || selected.image) && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border">
                      <img src={imagePreview || selected.image || ""} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm border">
                    Choose File
                    <input type="file" accept="image/*" onChange={(e) => handleImageSelect(e)} className="hidden" />
                  </label>
                </div>
              </div>
              <input type="number" value={selected.price} onChange={(e) => setSelected({ ...selected, price: parseFloat(e.target.value) })} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <select value={selected.categoryId?.toString() || ""} onChange={(e) => setSelected({ ...selected, categoryId: e.target.value ? parseInt(e.target.value) : null })} className="w-full px-3 py-2 border rounded-lg text-sm">
                <option value="">No category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={selected.isFeatured} onChange={(e) => setSelected({ ...selected, isFeatured: e.target.checked })} /> Featured</label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setShowEdit(false); setImageFile(null); setImagePreview(null); }} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Cancel</button>
              <button onClick={handleEdit} className="px-4 py-2 bg-[#17543A] text-white rounded-lg text-sm">Update</button>
            </div>
          </div>
        </div>
      )}

      {showDelete && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Delete Product</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "{selected.name}"?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDelete(false)} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showDiscount && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Set Discount Price</h3>
            <div className="space-y-3">
              <label className="text-sm text-gray-600">Original Price: KSh{selected.price}</label>
              <input type="number" value={discountVal} onChange={(e) => setDiscountVal(e.target.value)} placeholder="Discount price" className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowDiscount(false)} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Cancel</button>
              <button onClick={handleDiscount} className="px-4 py-2 bg-[#17543A] text-white rounded-lg text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
