"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    if (!loggedIn) {
      router.push("/auth");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return null; // hide content until auth checked
  return <>{children}</>;
}
