"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const stats = [
  {
    label: "Total Revenue",
    value: formatCurrency(341300),
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/20",
  },
  {
    label: "Total Orders",
    value: "896",
    change: "+8.2%",
    positive: true,
    icon: ShoppingCart,
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/20",
  },
  {
    label: "Active Products",
    value: "48",
    change: "+3",
    positive: true,
    icon: Package,
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
  },
  {
    label: "Conversion Rate",
    value: "4.3%",
    change: "+0.8%",
    positive: true,
    icon: TrendingUp,
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/20",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className={`relative overflow-hidden rounded-2xl border ${stat.border} bg-white/5 backdrop-blur-sm p-5`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-30`} />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-5 w-5 text-gray-400" />
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.positive
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-red-400 bg-red-500/10"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
