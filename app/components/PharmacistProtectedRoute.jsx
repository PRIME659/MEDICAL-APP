"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getRefreshToken } from "../lib/api";
import { getUserRole } from "../lib/auth";

export default function PharmacistProtectedRoute({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verify = () => {
      const access = getAccessToken();
      const refresh = getRefreshToken();

      if (!access && !refresh) {
        router.replace("/landing");
        return;
      }

      const role = getUserRole();
      if (role !== "pharmacist" && role !== "admin" && role !== "super_admin") {
        router.replace("/");
        return;
      }

      setAuthorized(true);
      setChecking(false);
    };

    verify();
  }, [router]);

  if (checking) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}