import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto bg-white rounded-xl shadow-2xl p-8">
        <p className="text-8xl mb-6">😕</p>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-[#17543A] hover:bg-[#144a33] text-white px-6 py-3 rounded-lg transition-colors"><Home className="w-5 h-5" /> Go to Homepage</Link>
      </div>
    </div>
  );
}
