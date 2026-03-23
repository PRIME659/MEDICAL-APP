"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("authUser");
    if (!auth) {
      router.replace("/auth");
    } else {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) return null;

  return children;
}