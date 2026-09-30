"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DestinationGrid from "./components/DestinationGrid";
import HowItWorks from "./components/HowItWorks";
import WhySproutSim from "./components/WhySproutSim";
import AppShowcase from "./components/AppShowcase";
import CompatibilityChecker from "./components/CompatibilityChecker";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import FloatingSupport from "./components/FloatingSupport";
import PlanModal from "./components/PlanModal";
import { PAKISTAN_PLANS, PakistanPackage, CurrencyCode } from "./data/destinations";

export default function Home() {
  const [currency, setCurrency] = useState<CurrencyCode>("PKR");
  const [selectedPlan, setSelectedPlan] = useState<PakistanPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPlanFor = (pkg: PakistanPackage) => {
    setSelectedPlan(pkg);
    setIsModalOpen(true);
  };

  const handleOpenDefaultModal = () => {
    const popular = PAKISTAN_PLANS.find((p) => p.popular) || PAKISTAN_PLANS[0];
    handleOpenPlanFor(popular);
  };

  const handleFilterPlanByTag = (tag: string) => {
    if (tag.includes("1 GB")) {
      const p = PAKISTAN_PLANS.find((x) => x.data === "1 GB");
      if (p) handleOpenPlanFor(p);
    } else if (tag.includes("3 GB")) {
      const p = PAKISTAN_PLANS.find((x) => x.data === "3 GB");
      if (p) handleOpenPlanFor(p);
    } else if (tag.includes("10 GB")) {
      const p = PAKISTAN_PLANS.find((x) => x.data === "10 GB");
      if (p) handleOpenPlanFor(p);
    } else if (tag.includes("50 GB")) {
      const p = PAKISTAN_PLANS.find((x) => x.data === "50 GB");
      if (p) handleOpenPlanFor(p);
    } else if (tag.includes("Unlimited")) {
      const p = PAKISTAN_PLANS.find((x) => x.data === "Unlimited");
      if (p) handleOpenPlanFor(p);
    } else {
      handleOpenDefaultModal();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F2]">
      {/* Navigation */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenPlan={handleOpenDefaultModal}
      />

      {/* Hero Section with 2x2 Mobile Grid & Live Pakistan Active eSIM Card */}
      <Hero
        onOpenPakistanModal={handleOpenDefaultModal}
        onFilterPlan={handleFilterPlanByTag}
      />

      {/* Pakistan eSIM Packages Grid (Exact 2-column, 2-row layout on mobile) */}
      <DestinationGrid
        currency={currency}
        onSelectPlan={handleOpenPlanFor}
      />

      {/* How It Works (2-column, 2-row mobile grid) */}
      <HowItWorks />

      {/* Why SproutSIM & Brand Promise (2-column, 2-row mobile grid) */}
      <WhySproutSim />

      {/* Interactive Mobile App Showcase (Clean vector icons, zero emojis) */}
      <AppShowcase />

      {/* Device Compatibility Checker (2-column mobile grid) */}
      <CompatibilityChecker />

      {/* Traveler Testimonials & 2x2 Payment Badges */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Solid Brand Footer */}
      <Footer />

      {/* Floating 24/7 WhatsApp & Live Support */}
      <FloatingSupport />

      {/* Pakistan Plan Selection & Instant Checkout Modal */}
      <PlanModal
        initialPlan={selectedPlan}
        currency={currency}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
