"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    setLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    setLoggedIn(false)
    toast.success("Loged out successfully!");
    router.push("/login")
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <Link href="/" className="font-bold text-xl">
        RecipeApp
      </Link>

      <div className="flex gap-4">
        {!loggedIn ? (
          <>
            <Link href="/login" className="text-blue-600">
              Login
            </Link>
            <Link href="/register" className="text-blue-600">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link href="/" className="text-blue-600">
              Recipes
            </Link>
            <Link href="/profile" className="text-blue-600">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}