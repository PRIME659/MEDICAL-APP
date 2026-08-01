"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getRefreshToken } from "../lib/api";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const access = getAccessToken();
    const refresh = getRefreshToken();

    if (!access && !refresh) {
      router.replace("/landing");
      return;
    }

    setAuthorized(true);
    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}