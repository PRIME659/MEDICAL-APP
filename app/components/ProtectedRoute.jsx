"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getRefreshToken } from "../lib/api";

export default function ProtectedRoute({ children }) {
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