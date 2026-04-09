"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Globe, Server, Cloud, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceConfigurator } from "@/components/services/service-configurator";
import { SERVICES, SERVICE_CATEGORY_LABELS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import type { Service } from "@/types";

const serviceIcons: Record<string, typeof Globe> = {
  "web-development": Globe,
  "api-development": Server,
  "cloud-infrastructure": Cloud,
  "security-audit": ShieldCheck,
};

export default function ServicesPage() {
  const [configuringService, setConfiguringService] = useState<Service | null>(null);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <SectionHeading
            title="Engineering Services"
            subtitle="Custom development, architecture, and consulting from senior engineers"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = serviceIcons[service.category] ?? Globe;
              return (
                <GlassCard key={service.id} delay={i * 0.1}>
                  <div className="p-8">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/10">
                        <Icon className="h-7 w-7 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {service.name}
                        </h3>
                        <Badge variant="cyan">
                          {SERVICE_CATEGORY_LABELS[service.category] ?? service.category}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2.5 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-lg border border-white/5"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div>
                        <div className="text-xs text-gray-500 mb-0.5">
                          Starting at
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {formatCurrency(service.basePrice)}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          ~{service.deliveryTimeDays} days delivery
                        </div>
                      </div>
                      <NeonButton
                        onClick={() => setConfiguringService(service)}
                      >
                        Configure & Book
                      </NeonButton>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />

      <AnimatePresence>
        {configuringService && (
          <ServiceConfigurator
            service={configuringService}
            onClose={() => setConfiguringService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
