"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { CURRENCY_RATES, CurrencyCode } from "../data/destinations";
import { Globe, ChevronDown, Menu, X, ArrowRight, ShieldCheck, Smartphone, User, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onOpenPlan: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export default function Navbar({
  currentCurrency,
  onCurrencyChange,
  onOpenPlan,
  onOpenAuth,
  onOpenProfile,
}: NavbarProps) {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies = Object.keys(CURRENCY_RATES) as CurrencyCode[];
  const activeEsim = user?.activeEsims?.[0];
  const remainingGB = activeEsim ? (activeEsim.dataRemainingMB / 1024).toFixed(1) : null;

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E0E7E2]">
      {/* Top Banner (Solid Forest Green) */}
      <div className="bg-[#123C2A] text-[#F5F7F2] text-xs py-1.5 px-3 sm:px-4 font-medium flex items-center justify-between gap-2 overflow-hidden">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-[#2FBF71] flex-shrink-0"></span>
          <span className="truncate text-[11px] sm:text-xs">
            <strong>SproutSIM 4G eSIM Data</strong> · Unrestricted Roaming · Instant Delivery
          </span>
        </div>
        {/* Social Quick Links */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href="https://www.instagram.com/sproutsimofficial" target="_blank" rel="noopener noreferrer" aria-label="SproutSIM on Instagram" className="text-[#A7E8C1] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
          </a>
          <a href="https://www.facebook.com/share/1Fx3Sxxoav/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="SproutSIM on Facebook" className="text-[#A7E8C1] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://tiktok.com/@sproutsimofficial" target="_blank" rel="noopener noreferrer" aria-label="SproutSIM on TikTok" className="text-[#A7E8C1] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
          </a>
          <a href="https://wa.me/923086379663?text=Hi%20SproutSIM%2C%20I%20need%20eSIM%20support" target="_blank" rel="noopener noreferrer" aria-label="SproutSIM WhatsApp" className="text-[#A7E8C1] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
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
              Data Plans
            </a>
            <a
              href="#why-sproutsim"
              className="text-[#1C2420] hover:text-[#2FBF71] text-sm font-semibold transition-colors"
            >
              Why SproutSIM
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
              Device Support
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

            {/* User Profile or Log In Button */}
            {isAuthenticated && user ? (
              <button
                type="button"
                onClick={onOpenProfile}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-[#123C2A] bg-[#F5F7F2] hover:bg-[#E9F8F0] transition-colors"
                title="Open Profile & Track Data"
              >
                <div className="w-6 h-6 rounded-lg bg-[#2FBF71] text-white flex items-center justify-center text-[10px] font-black">
                  {user.avatar || user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-[#123C2A] leading-tight flex items-center gap-1">
                    <span>{user.name.split(" ")[0]}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2FBF71]"></span>
                  </div>
                  {remainingGB && (
                    <div className="text-[9px] font-black text-[#2FBF71] leading-tight">
                      {remainingGB} GB Left
                    </div>
                  )}
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E0E7E2] hover:border-[#123C2A] bg-white text-xs font-bold text-[#123C2A] transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#2FBF71]" />
                <span>Log In</span>
              </button>
            )}

            {/* Instant Delivery Badge */}
            <div className="px-2.5 py-1.5 rounded-lg bg-[#E9F8F0] border border-[#A7E8C1] text-xs font-bold text-[#123C2A] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>Instant QR Delivery</span>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onOpenPlan}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-[#FFFFFF] text-xs font-bold tracking-wide uppercase transition-transform active:scale-95"
            >
              <span>Get eSIM Data</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Actions: Profile/Login + Compact CTA + Menu Button */}
          <div className="flex items-center space-x-1.5 md:hidden">
            {isAuthenticated && user ? (
              <button
                onClick={onOpenProfile}
                className="p-1.5 rounded-lg bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] flex items-center gap-1 text-[11px] font-bold"
                aria-label="My eSIM Profile"
              >
                <div className="w-5 h-5 rounded-md bg-[#2FBF71] text-white flex items-center justify-center text-[9px] font-black">
                  {user.avatar || user.name.slice(0, 2).toUpperCase()}
                </div>
                {remainingGB && (
                  <span className="text-[#123C2A] font-extrabold pr-0.5">
                    {remainingGB}G
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-2.5 py-1.5 rounded-lg border border-[#E0E7E2] bg-white text-[#123C2A] text-[11px] font-bold"
              >
                Log In
              </button>
            )}

            <button
              onClick={onOpenPlan}
              className="px-2.5 py-1.5 rounded-lg bg-[#2FBF71] hover:bg-[#26A561] text-white text-[11px] font-bold uppercase tracking-wider transition-colors"
            >
              Get eSIM
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl text-[#123C2A] hover:bg-[#F5F7F2] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#E0E7E2] px-5 pt-3 pb-6 space-y-4">
          
          {/* User Profile Quick Banner in Mobile Menu */}
          {isAuthenticated && user ? (
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="p-3 bg-[#E9F8F0] rounded-xl border border-[#A7E8C1] flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2FBF71] text-white flex items-center justify-center font-bold text-xs">
                  {user.avatar || user.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#123C2A]">{user.name}</div>
                  <div className="text-[10px] text-[#2FBF71] font-bold">
                    {remainingGB ? `Active eSIM: ${remainingGB} GB Remaining` : "View Profile Dashboard"}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#123C2A]" />
            </div>
          ) : (
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="p-3 bg-[#F5F7F2] rounded-xl border border-[#E0E7E2] flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#123C2A] text-white flex items-center justify-center">
                  <User className="w-4 h-4 text-[#2FBF71]" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#123C2A]">Sign In / Register</div>
                  <div className="text-[10px] text-[#5E6E66]">Track your active eSIM data</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#123C2A]" />
            </div>
          )}

          <nav className="flex flex-col space-y-3">
            <a
              href="#plans"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#1C2420] py-1 border-b border-[#F5F7F2]"
            >
              Data Plans
            </a>
            <a
              href="#why-sproutsim"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#1C2420] py-1 border-b border-[#F5F7F2]"
            >
              Why SproutSIM
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
              Device Support
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#1C2420] py-1 border-b border-[#F5F7F2]"
            >
              FAQ
            </a>

            {/* Social Links in Mobile Menu */}
            <div className="pt-2 pb-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#5E6E66] mb-2">Follow Us</div>
              <div className="flex items-center gap-3 flex-wrap">
                <a href="https://www.instagram.com/sproutsimofficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center gap-1.5 text-xs font-semibold text-[#123C2A] hover:text-[#2FBF71] transition-colors">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  <span>@sproutsimofficial</span>
                </a>
                <a href="https://www.facebook.com/share/1Fx3Sxxoav/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center gap-1.5 text-xs font-semibold text-[#123C2A] hover:text-[#2FBF71] transition-colors">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  <span>Facebook</span>
                </a>
                <a href="https://wa.me/923086379663?text=Hi%20SproutSIM%2C%20I%20need%20eSIM%20support" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center gap-1.5 text-xs font-semibold text-[#123C2A] hover:text-[#2FBF71] transition-colors">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>WhatsApp</span>
                </a>
                <a href="https://tiktok.com/@sproutsimofficial" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex items-center gap-1.5 text-xs font-semibold text-[#123C2A] hover:text-[#2FBF71] transition-colors">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
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
              <span>Get eSIM Data</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
