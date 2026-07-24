"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  forgotPassword,
  verifyOTP,
  resendOTP,
  resetPassword,
} from "@/services/authService";

interface ApiResponse {
  message: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [timer, setTimer] = useState(60);

  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (step !== 2) return;

    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, step]);

  // SEND OTP

  const handleSendOTP = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const res = await forgotPassword({
        email,
      });

      toast.success(res.message);

      setStep(2);

      setTimer(60);

      setCanResend(false);

    } catch (error) {
      const err = error as AxiosError<ApiResponse>;

      toast.error(
        err.response?.data?.message ||
          "Unable to send OTP."
      );

    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOTP({
        email,
        otp,
      });

      toast.success(res.message);

      setStep(3);

    } catch (error) {
      const err = error as AxiosError<ApiResponse>;

      toast.error(
        err.response?.data?.message ||
          "Invalid OTP"
      );

    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP

  const handleResendOTP = async () => {
    try {

      const res = await resendOTP(email);

      toast.success(res.message);

      setTimer(60);

      setCanResend(false);

    } catch (error) {
      const err = error as AxiosError<ApiResponse>;

      toast.error(
        err.response?.data?.message ||
          "Unable to resend OTP."
      );
    }
  };

  // RESET PASSWORD

  const handleResetPassword = async () => {

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

      const res = await resetPassword({

        email,

        newPassword,

        confirmPassword,

      });

      toast.success(res.message);

      setTimeout(() => {

        router.push("/login");

      }, 1200);

    } catch (error) {

      const err = error as AxiosError<ApiResponse>;

      toast.error(

        err.response?.data?.message ||

        "Unable to reset password."

      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">

            Forgot Password

          </h1>

          <p className="text-gray-500 mt-2">

            Reset your Goodie Gear account

          </p>

        </div>

        {step === 1 && (

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full rounded-lg border p-3"
            />

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full rounded-lg bg-pink-600 py-3 text-white font-semibold"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

          </div>

        )}

        {step===2 && (

          <div className="space-y-5">

            <input
              type="text"
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              className="w-full rounded-lg border p-3 text-center tracking-[8px]"
            />

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full rounded-lg bg-green-600 py-3 text-white font-semibold"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {canResend ? (

              <button
                onClick={handleResendOTP}
                className="w-full text-pink-600 font-medium"
              >
                Resend OTP
              </button>

            ) : (

              <p className="text-center text-sm text-gray-500">

                Resend OTP in {timer}s

              </p>

            )}

          </div>

        )}

                {/* STEP 3 */}

        {step === 3 && (

          <div className="space-y-5">

            {/* New Password */}

            <div>

              <label className="block mb-2 text-sm font-semibold">
                New Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-3 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* Confirm Password */}

            <div>

              <label className="block mb-2 text-sm font-semibold">
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-3 text-gray-500"
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>

            {/* Password Validation */}

            <div className="text-xs text-gray-500 space-y-1">

              <p
                className={
                  newPassword.length >= 8
                    ? "text-green-600"
                    : ""
                }
              >
                ✓ Minimum 8 characters
              </p>

              <p
                className={
                  /[A-Z]/.test(newPassword)
                    ? "text-green-600"
                    : ""
                }
              >
                ✓ One Uppercase Letter
              </p>

              <p
                className={
                  /[a-z]/.test(newPassword)
                    ? "text-green-600"
                    : ""
                }
              >
                ✓ One Lowercase Letter
              </p>

              <p
                className={
                  /\d/.test(newPassword)
                    ? "text-green-600"
                    : ""
                }
              >
                ✓ One Number
              </p>

              <p
                className={
                  /[!@#$%^&*(),.?":{}|<>]/.test(
                    newPassword
                  )
                    ? "text-green-600"
                    : ""
                }
              >
                ✓ One Special Character
              </p>

            </div>

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading
                ? "Updating..."
                : "Reset Password"}
            </button>

          </div>

        )}

        {/* Back */}

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-8 w-full text-center text-pink-600 hover:underline"
        >
          ← Back to Login
        </button>

      </div>

    </div>

  );

}