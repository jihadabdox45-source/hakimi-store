import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Hakimi Cosmetics | Best perfumes and accessories at competitive prices",
  description: "Discover the finest perfumes and luxury accessories at Hakimi Cosmetics. Shop now for the best prices and exclusive offers.",
  keywords: ["perfume", "perfumes", "accessories", "cosmetics", "Hakimi"],
  openGraph: {
    title: "Hakimi Cosmetics",
    description: "Discover the finest perfumes and luxury accessories at Hakimi Cosmetics.",
    type: "website",
    url: "https://hakimi-cosmetics.com/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <SessionProvider>
          {children}
          <Toaster position="top-center" toastOptions={{
            duration: 4000,
            style: { background: "#363636", color: "#fff" },
            success: { duration: 3000, iconTheme: { primary: "#10b981", secondary: "#fff" } },
            error: { duration: 4000, iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }} />
        </SessionProvider>
      </body>
    </html>
  );
}
