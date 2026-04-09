"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const mockOrders = [
  {
    id: "ORD-2401",
    customer: "Alex Chen",
    product: "Quantum UI Kit",
    amount: 149,
    status: "completed" as const,
    date: "2 hours ago",
  },
  {
    id: "ORD-2400",
    customer: "Sarah Miller",
    product: "Full-Stack Web Application",
    amount: 12000,
    status: "processing" as const,
    date: "5 hours ago",
  },
  {
    id: "ORD-2399",
    customer: "James Wilson",
    product: "NeoAuth SDK",
    amount: 299,
    status: "completed" as const,
    date: "8 hours ago",
  },
  {
    id: "ORD-2398",
    customer: "Emily Davis",
    product: "Apex Dashboard Template",
    amount: 199,
    status: "completed" as const,
    date: "12 hours ago",
  },
  {
    id: "ORD-2397",
    customer: "Michael Brown",
    product: "Security Audit & Hardening",
    amount: 10000,
    status: "pending" as const,
    date: "1 day ago",
  },
];

const statusVariant: Record<string, "green" | "amber" | "cyan" | "red"> = {
  completed: "green",
  processing: "cyan",
  pending: "amber",
  failed: "red",
};

export function RecentOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-6">Recent Orders</h3>

      <div className="space-y-3">
        {mockOrders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white truncate">
                  {order.product}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">{order.id}</span>
                <span className="text-xs text-gray-600">&middot;</span>
                <span className="text-xs text-gray-500">{order.customer}</span>
              </div>
            </div>
            <Badge variant={statusVariant[order.status] ?? "amber"}>
              {order.status}
            </Badge>
            <div className="text-right shrink-0">
              <div className="text-sm font-semibold text-white">
                {formatCurrency(order.amount)}
              </div>
              <div className="text-xs text-gray-600">{order.date}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
