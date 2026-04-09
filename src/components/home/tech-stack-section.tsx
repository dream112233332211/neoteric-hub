"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

const technologies = [
  { name: "React", color: "text-cyan-400" },
  { name: "Next.js", color: "text-white" },
  { name: "TypeScript", color: "text-blue-400" },
  { name: "Node.js", color: "text-green-400" },
  { name: "Python", color: "text-yellow-400" },
  { name: "Rust", color: "text-orange-400" },
  { name: "PostgreSQL", color: "text-blue-300" },
  { name: "Redis", color: "text-red-400" },
  { name: "Docker", color: "text-blue-500" },
  { name: "Kubernetes", color: "text-blue-400" },
  { name: "Terraform", color: "text-purple-400" },
  { name: "AWS", color: "text-amber-400" },
];

export function TechStackSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Built With the Best"
          subtitle="We leverage cutting-edge technologies to deliver world-class solutions"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all"
            >
              <span className={`text-2xl font-bold ${tech.color} mb-2 opacity-60 group-hover:opacity-100 transition-opacity`}>
                {tech.name.charAt(0)}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
