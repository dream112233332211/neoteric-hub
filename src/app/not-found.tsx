"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NeonButton } from "@/components/ui/neon-button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-4"
        >
          <div className="text-8xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
          <p className="text-gray-500 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <NeonButton>
                <Home className="h-4 w-4" />
                Go Home
              </NeonButton>
            </Link>
            <Link href="/products">
              <NeonButton variant="outline">
                <ArrowLeft className="h-4 w-4" />
                Browse Products
              </NeonButton>
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
