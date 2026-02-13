"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const userLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(userLoggedIn);

    if (!userLoggedIn && window.location.pathname !== "/auth") {
      router.push("/auth");
    }
  }, []);

  if (!isClient) return null; // avoid hydration errors

  return (
    <html lang="en">
      <body className="relative bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Toast system */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "14px",
              background: "#1e293b",
              color: "#fff",
              padding: "16px 20px",
              fontWeight: "500",
            },
          }}
        />

        {/* Navbar */}
        {loggedIn && <Navbar />}

        {/* Main content */}
        <main className="max-w-6xl mx-auto px-6 pt-32 pb-10 min-h-screen">
          {children}
        </main>

        {/* Footer with logout button */}
        {loggedIn && <Footer loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      </body>
    </html>
  );
}
