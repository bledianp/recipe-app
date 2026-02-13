"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuthRedirect = (): { loading: boolean } => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router]);
  return { loading };
};
