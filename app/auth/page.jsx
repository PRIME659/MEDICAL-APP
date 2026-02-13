"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // "login" or "signup"

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Fake auth (localStorage)
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);

    if (mode === "signup") {
      toast.success(`🎉 Welcome, ${email}! Your account has been created`);
    } else {
      toast.success(`Welcome back, ${email}!`);
    }

    setTimeout(() => {
      router.push("/"); // redirect to home
    }, 1200);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900">
      {/* Left Image */}
      <div className="relative w-full md:w-1/2 h-80 md:h-[500px] mb-6 md:mb-0">
        {/* <Image
          src="/_SimplicityIsBeauty__DoctorLife__HealingHands__GraceInWhite__CompassionFirst__ModernMedicine__WomenInHealth__CalmAndConfident__PureSoul__InspiringWomen__DedicationAndCare__WhiteCoatMagic-removebg-prev.png" // Replace with your nurse image
          alt="Nurse"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-xl"
        /> */}
      </div>

      {/* Auth Card */}
      <div className="relative w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="peer w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 pt-5 pb-2 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="absolute left-4 top-2 text-gray-400 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 pt-5 pb-2 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="absolute left-4 top-2 text-gray-400 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                className="text-blue-600 dark:text-blue-400 font-medium"
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-blue-600 dark:text-blue-400 font-medium"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
