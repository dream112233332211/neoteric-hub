"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Download,
  ShoppingCart,
  CheckCircle2,
  Clock,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NeonButton } from "@/components/ui/neon-button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { PRODUCTS, PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = PRODUCTS.find((p) => p.slug === id);
  const addProduct = useCartStore((s) => s.addProduct);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Product Not Found
            </h1>
            <Link href="/products">
              <NeonButton variant="outline">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </NeonButton>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <Link href="/products" className="hover:text-cyan-400 transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-300">{product.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left - Product Info */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Image placeholder */}
                <div className="relative h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center mb-8 overflow-hidden">
                  <Download className="h-20 w-20 text-gray-700" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="cyan">v{product.version}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="purple">
                    {PRODUCT_CATEGORY_LABELS[product.category] ?? product.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  {product.name}
                </h1>

                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Features */}
                <h3 className="text-lg font-semibold text-white mb-4">
                  Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {product.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-cyan-500 shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <h3 className="text-lg font-semibold text-white mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-medium text-gray-400 bg-white/5 rounded-lg border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right - Purchase Card */}
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <GlassCard hover={false}>
                  <div className="p-6">
                    <div className="text-3xl font-bold text-white mb-6">
                      {formatCurrency(product.price)}
                    </div>

                    <NeonButton
                      onClick={handleAddToCart}
                      className="w-full mb-3"
                      size="lg"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </NeonButton>

                    <NeonButton
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      <Download className="h-5 w-5" />
                      Preview Demo
                    </NeonButton>

                    <div className="mt-6 space-y-4 pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <Clock className="h-4 w-4" /> Updated
                        </span>
                        <span className="text-gray-300">
                          {formatDate(product.updatedAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <Download className="h-4 w-4" /> Version
                        </span>
                        <span className="text-gray-300">{product.version}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <Users className="h-4 w-4" /> Reviews
                        </span>
                        <span className="text-gray-300">
                          {product.reviewCount}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                      <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Instant Digital Delivery
                      </div>
                      <p className="text-xs text-gray-500">
                        Download link delivered immediately after purchase.
                        Lifetime updates included.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
