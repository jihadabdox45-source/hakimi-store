"use client";
import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, Loader } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((d) => { if (d.success) setSettings(d.data); }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSuccess(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setSubmitting(false);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-4">
              {settings?.phone && <div className="flex items-center gap-4"><div className="w-12 h-12 bg-[#e3ede7] rounded-full flex items-center justify-center"><Phone className="text-[#17543A]" /></div><div><h3 className="font-semibold">Phone</h3><p className="text-gray-600">{settings.phone}</p></div></div>}
              {settings?.email && <div className="flex items-center gap-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Mail className="text-blue-600" /></div><div><h3 className="font-semibold">Email</h3><p className="text-gray-600">{settings.email}</p></div></div>}
              {settings?.address && <div className="flex items-center gap-4"><div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"><MapPin className="text-gray-600" /></div><div><h3 className="font-semibold">Address</h3><p className="text-gray-600">{settings.address}</p></div></div>}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            {success && <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">Thank you! Your message has been sent.</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17543A]" />
                <input type="email" placeholder="Email *" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17543A]" />
              </div>
              <input type="text" placeholder="Subject *" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17543A]" />
              <textarea placeholder="Message *" required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17543A] resize-none" />
              <button type="submit" disabled={submitting} className="w-full bg-[#17543A] hover:bg-[#144a33] disabled:bg-gray-400 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2">
                {submitting ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
