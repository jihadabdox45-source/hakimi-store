import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Hakimi Cosmetics",
  description: "Privacy policy for Hakimi Cosmetics. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="text-gray-600">We collect personal information such as name, email, phone number, and shipping address when you place an order or contact us through our website.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-600">Your information is used to process orders, improve our services, send updates about your orders, and provide customer support. We do not sell your personal information to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Security</h2>
            <p className="text-gray-600">We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies</h2>
            <p className="text-gray-600">We use cookies to enhance your browsing experience. You can control cookie preferences through your browser settings.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Contact</h2>
            <p className="text-gray-600">If you have any questions about this privacy policy, please contact us through our website or visit our store.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
