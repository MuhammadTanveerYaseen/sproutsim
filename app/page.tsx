"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DestinationGrid from "./components/DestinationGrid";
import HowItWorks from "./components/HowItWorks";
import WhySproutSim from "./components/WhySproutSim";
import CompatibilityChecker from "./components/CompatibilityChecker";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import FloatingSupport from "./components/FloatingSupport";
import PlanModal from "./components/PlanModal";
import AuthModal from "./components/AuthModal";
import ProfileModal from "./components/ProfileModal";
import { AuthProvider } from "./context/AuthContext";
import { PAKISTAN_PLANS, PakistanPackage, CurrencyCode } from "./data/destinations";

function HomeContent() {
  const [currency, setCurrency] = useState<CurrencyCode>("PKR");
  const [selectedPlan, setSelectedPlan] = useState<PakistanPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
      {/* Navigation */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenPlan={handleOpenDefaultModal}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
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
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* User Login & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* User Profile & Active eSIM Data Tracker Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onBrowsePlans={() => {
          const el = document.getElementById("plans");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}
