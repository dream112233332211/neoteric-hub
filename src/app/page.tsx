"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ServicesPreview } from "@/components/home/services-preview";
import { TechStackSection } from "@/components/home/tech-stack-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <ServicesPreview />
        <TechStackSection />
      </main>
      <Footer />
    </>
  );
}
