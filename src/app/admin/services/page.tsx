"use client";

import { motion } from "framer-motion";
import { Globe, Server, Cloud, ShieldCheck, Settings } from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { SERVICES, SERVICE_CATEGORY_LABELS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

const serviceIcons: Record<string, typeof Globe> = {
  "web-development": Globe,
  "api-development": Server,
  "cloud-infrastructure": Cloud,
  "security-audit": ShieldCheck,
};

export default function AdminServicesPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your service offerings and configurations
          </p>
        </div>
        <NeonButton size="sm">
          <Settings className="h-4 w-4" />
          Add Service
        </NeonButton>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {SERVICES.map((service, i) => {
          const Icon = serviceIcons[service.category] ?? Globe;
          return (
            <GlassCard key={service.id} delay={i * 0.1}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/10">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {service.name}
                      </h3>
                      <Badge variant="cyan" className="mt-1">
                        {SERVICE_CATEGORY_LABELS[service.category] ?? service.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant={service.status === "active" ? "green" : "amber"}>
                    {service.status}
                  </Badge>
                </div>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-white/5">
                  <div>
                    <div className="text-xs text-gray-500">Base Price</div>
                    <div className="text-sm font-bold text-white">
                      {formatCurrency(service.basePrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Delivery</div>
                    <div className="text-sm font-bold text-white">
                      {service.deliveryTimeDays}d
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Steps</div>
                    <div className="text-sm font-bold text-white">
                      {service.configuratorSteps.length}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <NeonButton size="sm" variant="outline" className="flex-1">
                    Edit
                  </NeonButton>
                  <NeonButton size="sm" variant="ghost" className="flex-1">
                    View Bookings
                  </NeonButton>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
