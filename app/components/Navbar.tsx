"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { CURRENCY_RATES, CurrencyCode } from "../data/destinations";
import { Globe, ChevronDown, Menu, X, ArrowRight, ShieldCheck, Smartphone } from "lucide-react";

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onOpenPlan: () => void;
}

export default function Navbar({
  currentCurrency,
  onCurrencyChange,
  onOpenPlan,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies = Object.keys(CURRENCY_RATES) as CurrencyCode[];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E0E7E2]">
      {/* Top Banner (Solid Forest Green) */}
      <div className="bg-[#123C2A] text-[#F5F7F2] text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#2FBF71]"></span>
        <span>
          <strong>PAKISTAN NON-PTA eSIM DATA.</strong> Keep your Non-PTA iPhone or Android connected with 4G data. Zero PTA tax required.
        </span>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex-shrink-0 focus:outline-none">
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7">
            <a
              href="#plans"
              className="text-[#1C2420] hover:text-[#2FBF71] text-sm font-semibold transition-colors"
            >
              Non-PTA Plans
            </a>
            <a
              href="#why-non-pta"
              className="text-[#1C2420] hover:text-[#2FBF71] text-sm font-semibold transition-colors"
            >
              Zero PTA Tax
            </a>
            <a
              href="#how-it-works"
              className="text-[#1C2420] hover:text-[#2FBF71] text-sm font-semibold transition-colors"
            >
              How It Works
            </a>
            <a
              href="#compatibility"
              className="text-[#1C2420] hover:text-[#2FBF71] text-sm font-semibold transition-colors"
            >
              Non-PTA Devices
            </a>
            <a
              href="#faq"
              className="text-[#1C2420] hover:text-[#2FBF71] text-sm font-semibold transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Right Actions (Currency + CTA) */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Currency Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0E7E2] bg-[#F5F7F2] text-xs font-semibold text-[#1C2420] hover:border-[#2FBF71] transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#2FBF71]" />
                <span>{CURRENCY_RATES[currentCurrency].label}</span>
                <ChevronDown className="w-3 h-3 text-[#5E6E66]" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#FFFFFF] border border-[#E0E7E2] rounded-xl shadow-lg py-1 z-50">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        onCurrencyChange(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-[#F5F7F2] ${
                        currentCurrency === curr ? "text-[#2FBF71] bg-[#E9F8F0]" : "text-[#1C2420]"
                      }`}
                    >
                      <span>{curr}</span>
                      <span className="text-[#5E6E66]">{CURRENCY_RATES[curr].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Non-PTA Verified Badge */}
            <div className="px-2.5 py-1.5 rounded-lg bg-[#E9F8F0] border border-[#A7E8C1] text-xs font-bold text-[#123C2A] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>Non-PTA Ready</span>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onOpenPlan}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-[#FFFFFF] text-xs font-bold tracking-wide uppercase transition-transform active:scale-95"
            >
              <span>Get Non-PTA eSIM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#123C2A] hover:bg-[#F5F7F2] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#E0E7E2] px-5 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <a
              href="#plans"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#1C2420] py-1 border-b border-[#F5F7F2]"
            >
              Non-PTA Plans
            </a>
            <a
              href="#why-non-pta"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#1C2420] py-1 border-b border-[#F5F7F2]"
            >
              Zero PTA Tax Guarantee
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#1C2420] py-1 border-b border-[#F5F7F2]"
            >
              How It Works
            </a>
            <a
              href="#compatibility"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#1C2420] py-1 border-b border-[#F5F7F2]"
            >
              Supported Non-PTA Devices
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#1C2420] py-1 border-b border-[#F5F7F2]"
            >
              FAQ
            </a>
          </nav>

          {/* Mobile Currency & CTA */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#5E6E66]">Currency:</span>
              <div className="flex gap-1.5 overflow-x-auto py-1">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => onCurrencyChange(curr)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg border whitespace-nowrap ${
                      currentCurrency === curr
                        ? "bg-[#2FBF71] text-white border-[#2FBF71]"
                        : "bg-[#F5F7F2] text-[#1C2420] border-[#E0E7E2]"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlan();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-[#FFFFFF] text-sm font-bold tracking-wide uppercase transition-colors"
            >
              <span>Get Non-PTA eSIM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
