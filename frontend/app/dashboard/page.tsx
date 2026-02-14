"use client"
import { useEffect } from "react";
import { checkAuth } from "@/src/lib/auth";

export default function DashboardPage() {
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <h1 className="text-2xl mt-20 text-center">Welcome to HomePage</h1>
  );
}
