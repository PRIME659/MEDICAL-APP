"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getRefreshToken, refreshAccessToken } from "../lib/api";
import { getUserRole } from "../lib/auth";

export default function AdminProtectedRoute({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const access = getAccessToken();
      const refresh = getRefreshToken();

      if (!access && !refresh) {
        setChecking(false);
        router.replace("/landing");
        return;
      }

      const newAccess = await refreshAccessToken();
      if (!newAccess) {
        setChecking(false);
        router.replace("/landing");
        return;
      }

      const role = getUserRole();
      if (role !== "admin" && role !== "super_admin") {
        setChecking(false);
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
        <p className="text-gray-500 dark:text-gray-400 text-sm">Checking session...</p>
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}