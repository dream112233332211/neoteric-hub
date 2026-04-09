"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Server,
  Cloud,
  ShieldCheck,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SERVICES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

const serviceIcons: Record<string, typeof Globe> = {
  "web-development": Globe,
  "api-development": Server,
  "cloud-infrastructure": Cloud,
  "security-audit": ShieldCheck,
};

export function ServicesPreview() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Elite Engineering Services"
          subtitle="Custom solutions built by senior engineers with a zero-compromise approach"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = serviceIcons[service.category] ?? Globe;
            return (
              <GlassCard key={service.id} delay={i * 0.1}>
                <div className="p-8">
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/10">
                      <Icon className="h-7 w-7 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {service.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.features.slice(0, 4).map((feature) => (
                          <span
                            key={feature}
                            className="px-2.5 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-lg border border-white/5"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div>
                          <span className="text-sm text-gray-500">
                            Starting at
                          </span>
                          <span className="ml-2 text-lg font-bold text-white">
                            {formatCurrency(service.basePrice)}
                          </span>
                        </div>
                        <Link href={`/services?configure=${service.slug}`}>
                          <NeonButton size="sm" variant="outline">
                            Configure
                            <ArrowRight className="h-3.5 w-3.5" />
                          </NeonButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/services">
            <NeonButton variant="secondary">
              Explore All Services
              <ArrowRight className="h-4 w-4" />
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
