"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import API from "../../services/api";
import useAuthStore from "../../store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // LOGIN API
      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      // TOKEN
      const token =
        res.data.accessToken;

      // USER
      const user =
        res.data.user;

      // SAVE LOCAL STORAGE
      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // SAVE STORE
      setAuth(user, token);

      toast.success(
        "Login successful! Welcome back 👋"
      );

      // ROLE BASED REDIRECT
      if (
        user.role === "admin"
      ) {
        router.push("/admin");

      } else if (
        user.role ===
        "vendor"
      ) {
        router.push("/vendor/vendor-dashboard");

      } else {
        router.push("/");
      }

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
        "Login failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">

      {/* ── Left brand panel ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--dark) 0%, var(--dark-2) 55%, var(--pink-700) 100%)" }}
      >
        {/* decorative blobs — project colors only */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(219,39,119,.35), transparent)" }} />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,.25), transparent)" }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl"
            style={{ background: "var(--pink)", color: "#fff" }}>
            G
          </div>
          <span className="text-white text-2xl font-black tracking-tight">Goodie Gear</span>
        </div>

        {/* Centre copy */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-5xl font-black text-white leading-tight">
            Gear Up for<br />
            <span style={{ color: "var(--amber)" }}>Every Adventure</span>
          </h2>
          <p className="text-white/70 text-lg max-w-sm leading-relaxed">
            Shop the best gear, toys &amp; accessories. Thousands of happy
            customers trust Goodie Gear every day.
          </p>

          {/* Stats */}
          <div className="flex gap-8 pt-2">
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "10K+", label: "Products" },
              { value: "4.9★", label: "Avg Rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-sm text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial card */}
        <div className="relative z-10 p-5 rounded-2xl"
          style={{ background: "rgba(255,255,255,.08)", backdropFilter: "blur(8px)" }}>
          <p className="text-white/80 text-sm italic">
            &ldquo;Goodie Gear is my go-to for everything. Fast shipping, great quality!&rdquo;
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "var(--pink)" }}>
              R
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Riya Sharma</p>
              <p className="text-white/50 text-xs">Verified Buyer</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center p-8"
        style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl"
              style={{ background: "var(--pink)", color: "#fff" }}>
              G
            </div>
            <span className="text-2xl font-black tracking-tight" style={{ color: "var(--dark)" }}>
              Goodie Gear
            </span>
          </div>

          <div className="section-card p-10 enter-1">
            <div className="mb-8">
              <h1 className="text-3xl font-black" style={{ color: "var(--dark)" }}>
                Welcome back 👋
              </h1>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                Sign in to your Goodie Gear account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text)" }}>
                  Email address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none"
                    style={{ color: "var(--muted)" }}>
                    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: "2.5rem" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold" style={{ color: "var(--text)" }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-xs font-semibold hover:underline"
                    style={{ color: "var(--pink)" }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none"
                    style={{ color: "var(--muted)" }}>
                    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.75rem" }}
                  />
                  <button type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3.5 flex items-center transition-colors"
                    style={{ color: "var(--muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dark)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                  >
                    {showPassword ? (
                      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-base btn-pink w-full py-3.5 rounded-xl font-bold text-sm"
                style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in…
                  </span>
                ) : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: "var(--border)" }} />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-xs" style={{ background: "var(--surface)", color: "var(--muted)" }}>
                  Don&apos;t have an account?
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/register")}
              className="btn-base btn-outline-pink w-full py-3.5 rounded-xl font-bold text-sm"
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
