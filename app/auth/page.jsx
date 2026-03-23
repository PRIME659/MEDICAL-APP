"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    localStorage.setItem("authUser", "true");
    router.push("/");
  };

  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center">

      {/* Full screen video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Doctor image - left side */}
      <div className="hidden lg:flex absolute left-0 bottom-0 z-20 items-end">
        <Image
          src="/doctor.png"
          alt="Doctor"
          width={340}
          height={420}
          className="object-contain drop-shadow-2xl"
        />
      </div>

      {/* Form Card */}
      <div className="relative z-20 w-full max-w-md mx-auto md:mr-24 px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8">

          {/* Logo */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white">PrimeHealth</h2>
            <p className="text-gray-300 text-sm mt-1">
              {isLogin ? "Welcome back" : "Create your account"}
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-white/20 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200
                ${isLogin
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200
                ${!isLogin
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">

            {/* Full Name - Sign Up only */}
            {!isLogin && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
                />
              </div>
            )}

            {/* Email */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password - Sign Up only */}
            {!isLogin && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white text-xs"
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot Password - Login only */}
            {isLogin && (
              <div className="text-right">
                <a href="/forget-password" className="text-xs text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 text-sm mt-1"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/20" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            {/* Switch mode */}
            <p className="text-center text-sm text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 font-semibold hover:underline"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}