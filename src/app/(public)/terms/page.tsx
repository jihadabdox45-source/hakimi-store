import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Hakimi Cosmetics",
  description: "Terms and conditions for using Hakimi Cosmetics website and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p className="text-gray-600">Welcome to Hakimi Cosmetics. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Products & Pricing</h2>
            <p className="text-gray-600">All products are subject to availability. Prices are listed in KES and may change without notice. We reserve the right to modify or discontinue any product.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Orders & Payment</h2>
            <p className="text-gray-600">Orders are confirmed upon payment processing. We accept various payment methods as indicated at checkout. Full payment is required before order processing.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Shipping & Delivery</h2>
            <p className="text-gray-600">Delivery times are estimates and may vary. We are not responsible for delays caused by third-party carriers or customs clearance.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Returns & Refunds</h2>
            <p className="text-gray-600">Returns are accepted within 7 days of delivery for unopened products in original packaging. Refunds are processed within 5-10 business days after inspection.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact</h2>
            <p className="text-gray-600">For any questions regarding these terms, please contact us through our website or visit our store.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
