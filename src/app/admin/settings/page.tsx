"use client";
import React, { useState, useEffect } from "react";
import { Save, Globe, Phone, Share2, Settings } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "", siteDescription: "", phone: "", whatsapp: "", email: "", address: "",
    workingHours: "", facebook: "", instagram: "", twitter: "",
    currency: "KES", language: "English", timezone: "Africa/Nairobi",
    primaryColor: "#17543A", secondaryColor: "#B89B4C",
  });
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          const d = res.data;
          setSettings({
            siteName: d.siteName || "",
            siteDescription: d.siteDescription || "",
            phone: d.phone || "",
            whatsapp: d.whatsappNumber || "",
            email: d.email || "",
            address: d.address || "",
            workingHours: d.workingHours || "",
            facebook: d.facebookUrl || "",
            instagram: d.instagramUrl || "",
            twitter: d.twitterUrl || "",
            currency: d.currency || "KES",
            language: d.language || "English",
            timezone: d.timezone || "Africa/Nairobi",
            primaryColor: d.primaryColor || "#17543A",
            secondaryColor: d.secondaryColor || "#B89B4C",
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/settings/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName: settings.siteName,
          siteDescription: settings.siteDescription,
          primaryColor: settings.primaryColor,
          secondaryColor: settings.secondaryColor,
          whatsappNumber: settings.whatsapp,
          facebookUrl: settings.facebook,
          instagramUrl: settings.instagram,
          twitterUrl: settings.twitter,
          address: settings.address,
          phone: settings.phone,
          email: settings.email,
          currency: settings.currency,
          language: settings.language,
          timezone: settings.timezone,
          workingHours: settings.workingHours,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save settings.");
      }
    } catch {
      setMessage("Error saving settings.");
    }
    setSaving(false);
  };

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "social", label: "Social Media", icon: Share2 },
    { id: "business", label: "Business", icon: Settings },
  ];

  if (loading) return <div className="text-center py-12 text-gray-500">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 text-sm mt-1">Manage your store settings and preferences</p>
          </div>
          <button onClick={handleSubmit} disabled={saving}
            className="bg-[#17543A] hover:bg-[#144a33] disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm">
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${message.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 flex overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-5 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id ? "border-[#17543A] text-[#17543A] bg-[#f3f7f5]" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "general" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label><input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#17543A]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><input value={settings.siteDescription} onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#17543A]" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Currency</label><select value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="KES">KES</option><option value="USD">USD</option><option value="EUR">EUR</option><option value="SAR">SAR</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Language</label><select value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="English">English</option><option value="Arabic">Arabic</option><option value="Swahili">Swahili</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label><select value={settings.timezone} onChange={(e) => setSettings({ ...settings, timezone: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="Africa/Nairobi">Africa/Nairobi</option><option value="Asia/Riyadh">Asia/Riyadh</option><option value="UTC">UTC</option></select></div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label><input value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label><input value={settings.workingHours} onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><textarea value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm resize-none" /></div>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h3>
              <div className="space-y-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label><input value={settings.facebook} onChange={(e) => setSettings({ ...settings, facebook: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label><input value={settings.instagram} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label><input value={settings.twitter} onChange={(e) => setSettings({ ...settings, twitter: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              </div>
            </div>
          )}

          {activeTab === "business" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Settings</h3>
              <p className="text-sm text-gray-500">Additional business settings will be available here (minimum order, delivery fee, etc.)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
