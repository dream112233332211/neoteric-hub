"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Trash2, Package, Settings } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { CartItem } from "@/types";

interface CartItemRowProps {
  item: CartItem;
  index: number;
}

export function CartItemRow({ item, index }: CartItemRowProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] group"
    >
      {/* Icon */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5">
        {item.type === "product" ? (
          <Package className="h-6 w-6 text-cyan-500" />
        ) : (
          <Settings className="h-6 w-6 text-purple-500" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white truncate">
          {item.name}
        </h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-500 capitalize">{item.type}</span>
          {item.configuration && (
            <span className="text-xs text-purple-400">
              Custom Configuration
            </span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        {item.type === "product" && (
          <>
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Price */}
      <div className="text-right shrink-0">
        <div className="text-sm font-bold text-white">
          {formatCurrency(item.price * item.quantity)}
        </div>
        {item.quantity > 1 && (
          <div className="text-xs text-gray-500">
            {formatCurrency(item.price)} each
          </div>
        )}
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
