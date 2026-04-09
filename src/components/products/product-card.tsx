"use client";

import Link from "next/link";
import { Star, Download } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import type { Product } from "@/types";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const addProduct = useCartStore((s) => s.addProduct);

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
    <GlassCard delay={index * 0.08} className="flex flex-col h-full">
      <div className="p-6 flex-1 flex flex-col">
        <div className="relative h-40 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 flex items-center justify-center mb-5 overflow-hidden group">
          <Download className="h-12 w-12 text-gray-600 group-hover:text-cyan-500 transition-colors" />
          <div className="absolute top-3 right-3">
            <Badge variant="cyan">v{product.version}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Badge variant="purple">
            {PRODUCT_CATEGORY_LABELS[product.category] ?? product.category}
          </Badge>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-gray-600">({product.reviewCount})</span>
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
          {product.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-medium text-gray-500 bg-white/5 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <span className="text-xl font-bold text-white">
            {formatCurrency(product.price)}
          </span>
          <NeonButton size="sm" onClick={handleAddToCart}>
            Add to Cart
          </NeonButton>
        </div>
      </div>
    </GlassCard>
  );
}
