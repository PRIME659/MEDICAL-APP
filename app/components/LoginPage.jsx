"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password length
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    // Simulate login/signup logic
    toast.success(`🎉 Welcome back, ${formData.email}!`);
    setTimeout(() => {
      router.push("/"); // redirect to home page
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative">
      {/* Nurse Image */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
        <Image
          src="/nurse_placeholder.png" // your image here
          alt="Nurse"
          width={400}
          height={600}
          className="object-contain"
          priority
        />
      </div>

      {/* Card */}
      <div className="relative z-20 bg-white dark:bg-gray-800 shadow-2xl rounded-xl w-full max-w-lg p-10 md:pl-[480px] md:pr-10 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-400 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-gray-400 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Password
            </label>
            <span
              className="absolute right-4 top-3 cursor-pointer text-gray-400 dark:text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
