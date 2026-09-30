"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, Check, Sparkles, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export default function AuthModal({
  isOpen,
  onClose,
  defaultTab = "login",
}: AuthModalProps) {
  const { login, signup, loginWithGoogle, loginWithApple, demoLogin } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      if (tab === "login") {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError("Please enter your full name.");
          setIsLoading(false);
          return;
        }
        await signup(name, email, password);
      }
      onClose();
    } catch {
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleAuth = async () => {
    setIsLoading(true);
    try {
      await loginWithApple();
      onClose();
    } catch {
      setError("Apple sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    demoLogin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#123C2A]/70 flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#FFFFFF] rounded-3xl border-2 border-[#E0E7E2] shadow-2xl overflow-hidden my-4">
        
        {/* Modal Top Header */}
        <div className="bg-[#123C2A] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2FBF71] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
              SIM
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                {tab === "login" ? "Welcome Back to SproutSIM" : "Create Your Account"}
              </h2>
              <p className="text-xs text-[#A7E8C1]">
                Track your active eSIM, check remaining MBs &amp; top-up
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A523A] hover:bg-[#2FBF71] text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Quick Demo Access Callout */}
          <div
            onClick={handleDemoLogin}
            className="bg-[#E9F8F0] border-2 border-[#2FBF71] p-3 rounded-2xl cursor-pointer hover:bg-[#D5F3E4] transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#2FBF71] text-white flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#123C2A] flex items-center gap-1.5">
                  <span>1-Click Demo Login</span>
                  <span className="text-[9px] bg-[#2FBF71] text-white px-1.5 py-0.2 rounded font-black uppercase">
                    Live
                  </span>
                </div>
                <div className="text-[10px] text-[#5E6E66]">
                  View Active 10GB Pakistan eSIM (6.4GB remaining)
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#123C2A] group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-2">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl border-2 border-[#E0E7E2] hover:border-[#123C2A] bg-white text-[#123C2A] text-xs font-bold flex items-center justify-center gap-2.5 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={handleAppleAuth}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl border-2 border-[#E0E7E2] hover:border-[#123C2A] bg-white text-[#123C2A] text-xs font-bold flex items-center justify-center gap-2.5 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.79 1.44-.6.69-1.13 1.83-.99 2.94 1.07.08 2.15-.55 2.79-1.28z" />
              </svg>
              <span>Continue with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-[#E0E7E2] w-full"></div>
            <span className="bg-white px-3 text-[10px] uppercase font-bold text-[#5E6E66] absolute">
              or with email
            </span>
          </div>

          {/* Tabs: Sign In / Create Account */}
          <div className="grid grid-cols-2 p-1 bg-[#F5F7F2] rounded-xl border border-[#E0E7E2]">
            <button
              type="button"
              onClick={() => { setTab("login"); setError(null); }}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === "login"
                  ? "bg-white text-[#123C2A] shadow-sm"
                  : "text-[#5E6E66] hover:text-[#123C2A]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setTab("signup"); setError(null); }}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === "signup"
                  ? "bg-white text-[#123C2A] shadow-sm"
                  : "text-[#5E6E66] hover:text-[#123C2A]"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            {error && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {tab === "signup" && (
              <div>
                <label className="text-[11px] font-bold text-[#123C2A] block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#5E6E66] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Danyal Sheikh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F5F7F2] border border-[#E0E7E2] rounded-xl text-xs font-medium text-[#123C2A] focus:outline-none focus:border-[#123C2A] focus:bg-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-[#123C2A] block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#5E6E66] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F5F7F2] border border-[#E0E7E2] rounded-xl text-xs font-medium text-[#123C2A] focus:outline-none focus:border-[#123C2A] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#123C2A] block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#5E6E66] absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-[#F5F7F2] border border-[#E0E7E2] rounded-xl text-xs font-medium text-[#123C2A] focus:outline-none focus:border-[#123C2A] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#5E6E66] hover:text-[#123C2A]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-98 mt-2"
            >
              <span>{tab === "login" ? "Sign In to SproutSIM" : "Create My Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 text-center text-[10px] text-[#5E6E66] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2FBF71]" />
            <span>Secure 256-bit encrypted authentication</span>
          </div>

        </div>

      </div>
    </div>
  );
}
