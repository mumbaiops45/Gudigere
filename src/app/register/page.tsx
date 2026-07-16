"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import API from "../../services/api";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [touchedEmail, setTouchedEmail] = useState<boolean>(false);

  // ── Validations ──
  const validateName = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "Full name is required";
    if (trimmed.length < 2) return "Name must be at least 2 characters";
    if (trimmed.length > 50) return "Name must not exceed 50 characters";
    if (!/^[A-Za-z\s\-']+$/.test(trimmed))
      return "Name can only contain letters, spaces, hyphens, and apostrophes";
    return "";
  };

  const validateEmail = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "Email is required";
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      return "Please enter a valid email address (e.g., name@domain.com)";
    }
    return "";
  };

  // ── Handlers ──
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    setNameError(nameErr);
    setEmailError(emailErr);
    setTouchedEmail(true);

    if (nameErr || emailErr) return;

    try {
      setLoading(true);
      await API.post("/auth/register", {
        name: name.trim(),
        email,
        password,
      });
      toast.success("Account created! Please sign in 🎉");
      router.push("/login");
    } catch (error: unknown) {
      const message =
        error && typeof error === "object" && "response" in error
          ? (error.response as any)?.data?.message
          : undefined;
      toast.error(message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Password strength ──
  const getStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "", color: "var(--border)" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const map = [
      { label: "Too short", color: "var(--pink)" },
      { label: "Weak", color: "var(--pink)" },
      { label: "Fair", color: "var(--amber)" },
      { label: "Good", color: "var(--emerald)" },
      { label: "Strong", color: "var(--emerald)" },
    ] as const;
    return { score, ...map[score] };
  };

  const strength = getStrength(password);

  return (
    <>
      {/* ──────────────────────────────────────────────
          HIDE BROWSER NATIVE PASSWORD REVEAL
          ────────────────────────────────────────────── */}
      <style>{`
        .no-native-reveal::-ms-reveal {
          display: none;
        }
        .no-native-reveal::-webkit-credentials-auto-fill-button {
          display: none !important;
        }
        .no-native-reveal::-webkit-textfield-decoration-container {
          display: none;
        }
        .no-native-reveal::-webkit-search-decoration {
          display: none;
        }
      `}</style>

      <div className="min-h-[calc(100vh-64px)] flex">
        {/* ── Left brand panel ── */}
        <div
          className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--dark) 0%, var(--dark-2) 55%, var(--pink-700) 100%)",
          }}
        >
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,.3), transparent)",
            }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(219,39,119,.3), transparent)",
            }}
          />

          <div className="relative z-10 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl"
              style={{ background: "var(--amber)", color: "var(--dark)" }}
            >
              G
            </div>
            <span className="text-white text-2xl font-black tracking-tight">
              Goodie Gear
            </span>
          </div>

          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl font-black text-white leading-tight">
              Join the<br />
              <span style={{ color: "var(--amber)" }}>Goodie Gear Family</span>
            </h2>
            <p className="text-white/70 text-lg max-w-sm leading-relaxed">
              Create your free account and unlock exclusive deals, faster
              checkout &amp; order tracking — all in one place.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                "Exclusive member-only discounts",
                "Free shipping on orders ₹499+",
                "Easy returns & refunds",
                "Personalised recommendations",
              ].map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-3 text-white/80 text-sm"
                >
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "var(--emerald)" }}
                  >
                    <svg
                      width="10"
                      height="10"
                      fill="none"
                      stroke="var(--dark)"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="relative z-10 p-5 rounded-2xl flex items-center justify-between"
            style={{
              background: "rgba(255,255,255,.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p className="text-white/70 text-sm">Already have an account?</p>
            <button
              onClick={() => router.push("/login")}
              className="btn-base btn-amber text-sm font-bold px-4 py-2 rounded-xl"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div
          className="flex-1 flex items-center justify-center p-8"
          style={{ background: "var(--bg)" }}
        >
          <div className="w-full max-w-md">
            <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl"
                style={{ background: "var(--amber)", color: "var(--dark)" }}
              >
                G
              </div>
              <span
                className="text-2xl font-black tracking-tight"
                style={{ color: "var(--dark)" }}
              >
                Goodie Gear
              </span>
            </div>

            <div className="section-card p-10 enter-1">
              <div className="mb-8">
                <h1
                  className="text-3xl font-black"
                  style={{ color: "var(--dark)" }}
                >
                  Create Account 🚀
                </h1>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  It&apos;s free and only takes a minute
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                {/* ── Full Name ── */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--text)" }}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <span
                      className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none"
                      style={{ color: "var(--muted)" }}
                    >
                      <svg
                        width="17"
                        height="17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameError(validateName(e.target.value));
                      }}
                      onBlur={() => setNameError(validateName(name))}
                      className="form-input"
                      style={{
                        paddingLeft: "2.5rem",
                        borderColor: nameError ? "var(--pink)" : undefined,
                      }}
                    />
                  </div>
                  {nameError && (
                    <p
                      className="mt-1 text-sm font-medium"
                      style={{ color: "var(--pink)" }}
                    >
                      {nameError}
                    </p>
                  )}
                </div>

                {/* ── Email ── */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--text)" }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span
                      className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none"
                      style={{ color: "var(--muted)" }}
                    >
                      <svg
                        width="17"
                        height="17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (touchedEmail) {
                          setEmailError(validateEmail(e.target.value));
                        }
                      }}
                      onBlur={() => {
                        setTouchedEmail(true);
                        setEmailError(validateEmail(email));
                      }}
                      className="form-input"
                      style={{
                        paddingLeft: "2.5rem",
                        borderColor: emailError ? "var(--pink)" : undefined,
                      }}
                    />
                  </div>
                  {touchedEmail && emailError && (
                    <p
                      className="mt-1 text-sm font-medium"
                      style={{ color: "var(--pink)" }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                {/* ── Password ── */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--text)" }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span
                      className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none"
                      style={{ color: "var(--muted)" }}
                    >
                      <svg
                        width="17"
                        height="17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input no-native-reveal"  // ← HIDE NATIVE EYE
                      style={{
                        paddingLeft: "2.5rem",
                        paddingRight: "2.75rem",
                      }}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3.5 flex items-center transition-colors"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--dark)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      {showPassword ? (
                        <svg
                          width="17"
                          height="17"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg
                          width="17"
                          height="17"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {password && (
                    <div className="mt-2 space-y-1.5">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{
                              background:
                                i <= strength.score
                                  ? strength.color
                                  : "var(--border)",
                            }}
                          />
                        ))}
                      </div>
                      <p
                        className="text-xs font-semibold"
                        style={{ color: strength.color }}
                      >
                        {strength.label}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !!nameError || !!emailError}
                  className="btn-base btn-pink w-full py-3.5 rounded-xl font-bold text-sm"
                  style={{
                    opacity: loading || nameError || emailError ? 0.6 : 1,
                    cursor:
                      loading || nameError || emailError
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin"
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Creating account…
                    </span>
                  ) : (
                    "Create Free Account"
                  )}
                </button>

                <p className="text-center text-xs" style={{ color: "var(--muted)" }}>
                  By signing up you agree to our{" "}
                  <span className="underline cursor-pointer">Terms</span>
                  {" "}&amp;{" "}
                  <span className="underline cursor-pointer">Privacy Policy</span>
                </p>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="w-full border-t"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>
                <div className="relative flex justify-center">
                  <span
                    className="px-4 text-xs"
                    style={{ background: "var(--surface)", color: "var(--muted)" }}
                  >
                    Already have an account?
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.push("/login")}
                className="btn-base btn-outline-pink w-full py-3.5 rounded-xl font-bold text-sm"
              >
                Sign In Instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}