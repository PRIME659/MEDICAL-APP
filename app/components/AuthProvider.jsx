"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (!userLoggedIn && pathname !== "/auth") {
      router.replace("/auth");
    }

    if (userLoggedIn && pathname === "/auth") {
      router.replace("/");
    }

    setLoggedIn(userLoggedIn);
    setChecking(false);
  }, [pathname, router]);

  if (checking) return null;

  return (
    <>
      {loggedIn && <Navbar />}

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-10 min-h-screen">
        {children}
      </main>

      {loggedIn && <Footer />}
    </>
  );
}
