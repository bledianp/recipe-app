"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/src/services/authService";
import { useAuthRedirect } from "@/src/hooks/useAuthRedirect";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { loading } = useAuthRedirect();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  if (loading) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser(email, password);
      const token = res.data.accessToken;
      localStorage.setItem("accessToken", token);
      toast.success("Logged in succesfully!!");
      router.push("/");
      window.location.reload();
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-64">
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-black text-white p-2">Login</button>
      </form>
    </div>
  );
}
