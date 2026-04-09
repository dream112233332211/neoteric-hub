"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Download } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { PRODUCTS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";

export function FeaturedProducts() {
  const addProduct = useCartStore((s) => s.addProduct);
  const featured = PRODUCTS.slice(0, 3);

  const handleAddToCart = (product: (typeof PRODUCTS)[0]) => {
    addProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Digital Assets"
          subtitle="Hand-picked premium products from our curated marketplace"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <GlassCard key={product.id} delay={i * 0.1} className="flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                {/* Image placeholder */}
                <div className="relative h-40 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 flex items-center justify-center mb-5 overflow-hidden group">
                  <Download className="h-12 w-12 text-gray-600 group-hover:text-cyan-500 transition-colors" />
                  <div className="absolute top-3 right-3">
                    <Badge variant="cyan">v{product.version}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="purple">{product.category}</Badge>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>

                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors mb-2">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm text-gray-400 flex-1 mb-4">
                  {product.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-medium text-gray-500 bg-white/5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xl font-bold text-white">
                    {formatCurrency(product.price)}
                  </span>
                  <NeonButton
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </NeonButton>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/products">
            <NeonButton variant="outline">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
