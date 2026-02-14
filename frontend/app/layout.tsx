import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Recipe App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <Navbar />
          <main>{children}
          <Toaster position="top-right" reverseOrder={false} />
          </main>
        </body>
    </html>
  );
}
