"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { User, Lock, Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { username, password, redirect: false });
    if (result?.ok) {
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6", padding: "0 16px" }}>
      <div style={{ width: "100%", maxWidth: "400px", backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ width: "56px", height: "56px", margin: "0 auto 16px", background: "linear-gradient(to right, #17543A, #B89B4C)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LogIn color="white" size={28} />
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: "0 0 4px" }}>Admin Login</h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Username</label>
            <div style={{ position: "relative" }}>
              <User size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
                style={{ width: "100%", padding: "10px 12px 10px 40px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => { e.target.style.borderColor = "#17543A"; e.target.style.boxShadow = "0 0 0 1px #17543A" }}
                onBlur={(e) => { e.target.style.borderColor = "#d1d5db"; e.target.style.boxShadow = "none" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                style={{ width: "100%", padding: "10px 40px 10px 40px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => { e.target.style.borderColor = "#17543A"; e.target.style.boxShadow = "0 0 0 1px #17543A" }}
                onBlur={(e) => { e.target.style.borderColor = "#d1d5db"; e.target.style.boxShadow = "none" }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: "4px", display: "flex" }}
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ padding: "8px 12px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", fontSize: "14px" }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "10px 16px", backgroundColor: loading ? "#9ca3af" : "#17543A", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#144a33" }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#17543A" }}
          >
            {loading && <span style={{ width: "16px", height: "16px", border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
            Back to <a href="/" style={{ color: "#17543A", fontWeight: "500", textDecoration: "underline" }}>main website</a>
          </p>
        </div>
      </div>
    </div>
  );
}
