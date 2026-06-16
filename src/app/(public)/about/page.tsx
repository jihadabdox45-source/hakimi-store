import { Star, Shield, Heart, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Hakimi Cosmetics",
  description: "Learn more about Hakimi Cosmetics, our mission, and our commitment to quality.",
};

export default function AboutPage() {
  const stats = [
    { icon: Star, number: "500+", label: "Products Available" },
    { icon: Award, number: "5+", label: "Years Experience" },
    { icon: Shield, number: "100%", label: "Authentic Products" },
    { icon: Heart, number: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Trusted Partner in Premium Cosmetics</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">We are passionate about bringing you the finest collection of global cosmetics and luxury beauty accessories.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-[#e3ede7] rounded-full flex items-center justify-center mx-auto mb-4"><s.icon className="text-[#17543A] w-8 h-8" /></div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{s.number}</div>
              <div className="text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
