"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!isLogin) {
      if (!formData.confirm.trim()) {
        newErrors.confirm = "Please confirm your password.";
      } else if (formData.confirm !== formData.password) {
        newErrors.confirm = "Passwords do not match.";
      }
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    localStorage.setItem("authUser", "true");
    router.push("/");
  };

  const inputClass = "w-full bg-transparent text-white placeholder-white/60 focus:outline-none text-sm";
  const fieldClass = "bg-blue-900/30 backdrop-blur-sm border rounded-xl p-3.5";
  const errorBorder = "border-red-400/60";
  const normalBorder = "border-blue-400/20";

  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center">

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/55 z-10" />

      <div className="relative z-20 w-full max-w-lg px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 sm:p-10">

          {/* Logo */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold" style={{ color: "#4dffa6", textShadow: "0 0 15px rgba(77,255,166,0.4), 0 0 30px rgba(59,130,246,0.3), 0 0 50px rgba(59,130,246,0.15)" }}>PrimeHealth</h2>
            <p className="text-gray-300 text-sm mt-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-white/20 mb-8">
            <button
              onClick={() => { setIsLogin(true); setErrors({}); setFormData({ name: "", email: "", password: "", confirm: "" }); }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors duration-200 ${isLogin ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setErrors({}); setFormData({ name: "", email: "", password: "", confirm: "" }); }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors duration-200 ${!isLogin ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">

            {/* Full Name */}
            {!isLogin && (
              <div>
                <div className={`${fieldClass} ${errors.name ? errorBorder : normalBorder}`}>
                  <label className="block text-xs font-medium text-blue-200 mb-1">Full Name</label>
                  <input name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} className={inputClass} />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <div className={`${fieldClass} ${errors.email ? errorBorder : normalBorder}`}>
                <label className="block text-xs font-medium text-blue-200 mb-1">Email</label>
                <input name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className={inputClass} />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className={`${fieldClass} ${errors.password ? errorBorder : normalBorder}`}>
                <label className="block text-xs font-medium text-blue-200 mb-1">Password</label>
                <div className="relative">
                  <input name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={handleChange} className={`${inputClass} pr-12`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white text-xs font-medium transition">
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div>
                <div className={`${fieldClass} ${errors.confirm ? errorBorder : normalBorder}`}>
                  <label className="block text-xs font-medium text-blue-200 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input name="confirm" type={showConfirm ? "text" : "password"} placeholder="••••••••" value={formData.confirm} onChange={handleChange} className={`${inputClass} pr-12`} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white text-xs font-medium transition">
                      {showConfirm ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                {errors.confirm && <p className="text-red-400 text-xs mt-1 ml-1">{errors.confirm}</p>}
              </div>
            )}

            {/* Forgot Password */}
            {isLogin && (
              <div className="text-right">
                <a href="/forget-password" className="text-xs text-blue-300 hover:text-white transition hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 text-sm mt-1"
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
              <button onClick={() => { setIsLogin(!isLogin); setErrors({}); setFormData({ name: "", email: "", password: "", confirm: "" }); }} className="text-blue-400 font-semibold hover:underline">
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>

            {/* Back to landing */}
            <p className="text-center text-xs text-gray-400 mt-2">
              <button onClick={() => router.push("/landing")} className="hover:text-white transition">
                ← Back to Home
              </button>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}