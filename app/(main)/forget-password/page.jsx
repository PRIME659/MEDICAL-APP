"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Reset link sent to ${email}. Check your inbox!`, { duration: 5000 });
      setEmail("");
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">

      <Toaster position="top-right" />

      {/* Video background */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Card */}
      <div className="relative z-20 w-full max-w-md px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8">

          <div className="text-center mb-6">
            <p className="text-5xl mb-3">🔐</p>
            <h2 className="text-2xl font-bold text-white">Forgot Password</h2>
            <p className="text-gray-300 text-sm mt-2 max-w-xs mx-auto">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 text-sm"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <button
            onClick={() => router.push("/auth")}
            className="w-full mt-4 text-center text-sm text-gray-300 hover:text-white transition"
          >
            ← Back to Login
          </button>

        </div>
      </div>

    </div>
  );
}