"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NeonButton } from "@/components/ui/neon-button";
import { GlassCard } from "@/components/ui/glass-card";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  company: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = getTotalPrice();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);

    const sanitizedData = {
      name: data.name,
      email: data.email,
      company: data.company || undefined,
    };

    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: sanitizedData,
          totalAmount: totalPrice,
        }),
      });

      const result = await response.json() as { success: boolean; orderId?: string; error?: string };

      if (result.success) {
        clearCart();
        router.push(`/checkout/success?orderId=${result.orderId}`);
      } else {
        toast.error(result.error ?? "Payment failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Your cart is empty
            </h1>
            <Link href="/products">
              <NeonButton variant="outline">
                <ArrowLeft className="h-4 w-4" />
                Browse Products
              </NeonButton>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>

            <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
            <p className="text-gray-500 mb-10">
              Complete your purchase securely
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <GlassCard hover={false}>
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-cyan-400" />
                    Contact Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      {...register("company")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                      placeholder="Acme Inc."
                    />
                  </div>

                  {/* Payment section notice */}
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                    <p className="text-xs text-amber-400">
                      <strong>Demo Mode:</strong> This is a demo checkout.
                      Configure your Stripe keys in the environment to enable
                      live payments.
                    </p>
                  </div>

                  <NeonButton
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Complete Purchase — {formatCurrency(totalPrice)}
                      </>
                    )}
                  </NeonButton>
                </form>
              </GlassCard>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <GlassCard hover={false}>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Order Summary
                  </h3>

                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-400 truncate mr-2">
                          {item.name}
                          {item.quantity > 1 && ` x${item.quantity}`}
                        </span>
                        <span className="text-white shrink-0">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-white">Total</span>
                      <span className="text-xl font-bold text-white">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    256-bit SSL encrypted checkout
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
