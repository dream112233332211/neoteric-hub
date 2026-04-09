"use client";

import { motion } from "framer-motion";
import { StatsCards } from "@/components/admin/stats-cards";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { RecentOrders } from "@/components/admin/recent-orders";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Command Center</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back. Here&apos;s your platform overview.
        </p>
      </motion.div>

      <StatsCards />
      <RevenueChart />
      <RecentOrders />
    </div>
  );
}
