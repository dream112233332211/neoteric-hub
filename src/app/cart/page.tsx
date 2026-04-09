"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, ArrowRight, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { NeonButton } from "@/components/ui/neon-button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const clearCart = useCartStore((s) => s.clearCart);

  const totalPrice = getTotalPrice();
  const hasItems = items.length > 0;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <SectionHeading
            title="Your Cart"
            subtitle={
              hasItems
                ? `${items.length} item${items.length > 1 ? "s" : ""} in your cart`
                : undefined
            }
          />

          {hasItems ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3">
                <AnimatePresence>
                  {items.map((item, i) => (
                    <CartItemRow key={item.id} item={item} index={i} />
                  ))}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-4"
                >
                  <button
                    onClick={clearCart}
                    className="text-sm text-gray-600 hover:text-red-400 transition-colors"
                  >
                    Clear cart
                  </button>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div>
                <GlassCard hover={false}>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">
                      Order Summary
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="text-white">
                          {formatCurrency(totalPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Processing Fee</span>
                        <span className="text-white">
                          {formatCurrency(0)}
                        </span>
                      </div>
                      <div className="border-t border-white/5 pt-3 flex justify-between">
                        <span className="font-semibold text-white">Total</span>
                        <span className="text-xl font-bold text-white">
                          {formatCurrency(totalPrice)}
                        </span>
                      </div>
                    </div>

                    <Link href="/checkout">
                      <NeonButton className="w-full" size="lg">
                        Proceed to Checkout
                        <ArrowRight className="h-4 w-4" />
                      </NeonButton>
                    </Link>

                    <p className="text-xs text-gray-600 text-center mt-4">
                      Secure checkout powered by Stripe
                    </p>
                  </div>
                </GlassCard>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-6">
                <ShoppingBag className="h-10 w-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-8">
                Browse our products and services to get started
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/products">
                  <NeonButton>
                    <ShoppingCart className="h-4 w-4" />
                    Browse Products
                  </NeonButton>
                </Link>
                <Link href="/services">
                  <NeonButton variant="outline">View Services</NeonButton>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
