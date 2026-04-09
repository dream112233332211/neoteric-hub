"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NeonButton } from "@/components/ui/neon-button";
import { GlassCard } from "@/components/ui/glass-card";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "DEMO-ORDER";

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard hover={false}>
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
            >
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </motion.div>

            <h1 className="text-2xl font-bold text-white mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-400 mb-6">
              Your order has been processed and your digital assets are ready
              for download.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
              <div className="text-xs text-gray-500 mb-1">Order ID</div>
              <div className="text-sm font-mono text-cyan-400">{orderId}</div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 mb-6">
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium mb-1">
                <Download className="h-4 w-4" />
                Digital Delivery
              </div>
              <p className="text-xs text-gray-400">
                Download links have been sent to your email. You can also
                access them from your order history.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/products" className="flex-1">
                <NeonButton variant="outline" className="w-full">
                  Continue Shopping
                </NeonButton>
              </Link>
              <Link href="/" className="flex-1">
                <NeonButton className="w-full">
                  Go Home
                  <ArrowRight className="h-4 w-4" />
                </NeonButton>
              </Link>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 flex items-center justify-center">
        <Suspense
          fallback={
            <div className="text-center py-20">
              <div className="animate-spin h-8 w-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto" />
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
