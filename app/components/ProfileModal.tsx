"use client";

import React, { useState } from "react";
import {
  X,
  Smartphone,
  Wifi,
  Copy,
  Check,
  QrCode,
  PlusCircle,
  Clock,
  ShieldCheck,
  LogOut,
  RefreshCw,
  ShoppingBag,
  User,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingDown,
} from "lucide-react";
import { useAuth, UserEsim } from "../context/AuthContext";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBrowsePlans: () => void;
}

export default function ProfileModal({
  isOpen,
  onClose,
  onBrowsePlans,
}: ProfileModalProps) {
  const { user, logout, topUpEsim, simulateDataUsage } = useAuth();
  const [activeTab, setActiveTab] = useState<"esims" | "orders" | "settings">("esims");
  const [selectedEsimForQr, setSelectedEsimForQr] = useState<UserEsim | null>(null);
  const [copiedIccid, setCopiedIccid] = useState<string | null>(null);
  const [topUpNotice, setTopUpNotice] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const handleCopyIccid = (iccid: string) => {
    navigator.clipboard?.writeText(iccid);
    setCopiedIccid(iccid);
    setTimeout(() => setCopiedIccid(null), 2000);
  };

  const handleTopUp = (esimId: string, gb: number) => {
    topUpEsim(esimId, gb);
    setTopUpNotice(`Successfully added +${gb} GB to your active eSIM!`);
    setTimeout(() => setTopUpNotice(null), 3000);
  };

  const handleUseData = (esimId: string) => {
    simulateDataUsage(esimId, 500); // simulate 500 MB
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#123C2A]/70 flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-3xl border-2 border-[#E0E7E2] shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[90vh]">
        
        {/* Header Banner */}
        <div className="bg-[#123C2A] text-white p-5 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#2FBF71] text-white flex items-center justify-center font-extrabold text-base shadow-sm">
              {user.avatar || user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-extrabold tracking-tight">
                  {user.name}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E9F8F0] text-[#123C2A] uppercase">
                  {user.provider === "google" ? "Google" : user.provider === "apple" ? "Apple" : "Verified"}
                </span>
              </div>
              <p className="text-xs text-[#A7E8C1]">{user.email}</p>
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

        {/* Tab Bar */}
        <div className="flex items-center border-b border-[#E0E7E2] px-5 sm:px-6 bg-[#F5F7F2] flex-shrink-0 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("esims")}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "esims"
                ? "border-[#2FBF71] text-[#123C2A]"
                : "border-transparent text-[#5E6E66] hover:text-[#123C2A]"
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>My Active eSIMs</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#E9F8F0] text-[#123C2A] font-extrabold">
              {user.activeEsims.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "orders"
                ? "border-[#2FBF71] text-[#123C2A]"
                : "border-transparent text-[#5E6E66] hover:text-[#123C2A]"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order History</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#E0E7E2] text-[#123C2A] font-extrabold">
              {user.orderHistory.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "settings"
                ? "border-[#2FBF71] text-[#123C2A]"
                : "border-transparent text-[#5E6E66] hover:text-[#123C2A]"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Top-up Notice */}
          {topUpNotice && (
            <div className="p-3 rounded-2xl bg-[#E9F8F0] border-2 border-[#2FBF71] text-[#123C2A] text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-[#2FBF71] flex-shrink-0" />
              <span>{topUpNotice}</span>
            </div>
          )}

          {/* TAB 1: ACTIVE ESIMS & LIVE DATA BALANCE */}
          {activeTab === "esims" && (
            <div className="space-y-4">
              {user.activeEsims.length === 0 ? (
                <div className="text-center py-10 space-y-3 bg-[#F5F7F2] rounded-2xl border-2 border-[#E0E7E2] p-6">
                  <Smartphone className="w-10 h-10 text-[#5E6E66] mx-auto" />
                  <h3 className="text-base font-bold text-[#123C2A]">No Active eSIM Yet</h3>
                  <p className="text-xs text-[#5E6E66] max-w-sm mx-auto">
                    You don&apos;t have any active packages yet. Purchase an eSIM to start tracking your high-speed data right here.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onBrowsePlans();
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2FBF71] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    <span>View Pakistan eSIM Plans</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                user.activeEsims.map((esim) => {
                  const percentRemaining = Math.max(
                    0,
                    Math.min(100, Math.round((esim.dataRemainingMB / esim.dataTotalMB) * 100))
                  );
                  const remainingGB = (esim.dataRemainingMB / 1024).toFixed(2);
                  const totalGB = (esim.dataTotalMB / 1024).toFixed(1);
                  const usedGB = (esim.dataUsedMB / 1024).toFixed(2);

                  return (
                    <div
                      key={esim.id}
                      className="bg-[#FFFFFF] rounded-2xl border-2 border-[#E0E7E2] p-4 sm:p-6 shadow-sm space-y-4 hover:border-[#2FBF71] transition-all"
                    >
                      {/* Top Bar of eSIM Card */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F5F7F2] gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#123C2A] text-white flex items-center justify-center font-black text-xs">
                            SIM
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-base font-extrabold text-[#123C2A]">
                              {esim.planName}
                            </h3>
                            <div className="text-[11px] text-[#5E6E66] flex items-center gap-1">
                              <span>ICCID:</span>
                              <span className="font-mono font-bold text-[#123C2A]">{esim.iccid}</span>
                              <button
                                onClick={() => handleCopyIccid(esim.iccid)}
                                className="text-[#2FBF71] hover:text-[#123C2A] p-0.5"
                                title="Copy ICCID"
                              >
                                {copiedIccid === esim.iccid ? (
                                  <Check className="w-3 h-3 text-[#2FBF71]" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Status Badges */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-[#15803D] bg-[#F0FDF4] px-2 py-1 rounded-lg border border-[#BBF7D0]">
                            GloEsim Provider
                          </span>
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-[#2FBF71] animate-pulse"></span>
                            <span>{esim.status}</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#5E6E66] bg-[#F5F7F2] px-2 py-1 rounded-lg border border-[#E0E7E2]">
                            4G Roaming
                          </span>
                        </div>
                      </div>

                      {/* DATA BALANCE METER (The User's Core Request!) */}
                      <div className="bg-[#F5F7F2] p-4 sm:p-5 rounded-2xl border border-[#E0E7E2] space-y-3">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6E66] block">
                              Data Remaining
                            </span>
                            <div className="text-2xl sm:text-3xl font-black text-[#123C2A] flex items-baseline gap-1.5">
                              <span>{remainingGB} GB</span>
                              <span className="text-xs font-bold text-[#5E6E66]">
                                ({esim.dataRemainingMB.toLocaleString()} MB)
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6E66] block">
                              Total Allowance
                            </span>
                            <span className="text-sm sm:text-base font-extrabold text-[#123C2A]">
                              {totalGB} GB ({esim.dataTotalMB.toLocaleString()} MB)
                            </span>
                          </div>
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="space-y-1">
                          <div className="w-full bg-[#E0E7E2] h-3.5 rounded-full overflow-hidden p-0.5">
                            <div
                              className="bg-[#2FBF71] h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentRemaining}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[10px] font-bold text-[#5E6E66] pt-0.5">
                            <span>Used: {usedGB} GB ({esim.dataUsedMB.toLocaleString()} MB)</span>
                            <span className="text-[#2FBF71] font-extrabold">
                              {percentRemaining}% Available
                            </span>
                          </div>
                        </div>

                        {/* Validity & Roaming Status */}
                        <div className="pt-2 border-t border-[#E0E7E2] flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1.5">
                          <div className="flex items-center gap-1.5 text-[#123C2A] font-semibold">
                            <Clock className="w-3.5 h-3.5 text-[#2FBF71]" />
                            <span>Valid until {esim.expiresAt}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#5E6E66] text-[11px]">
                            <Wifi className="w-3.5 h-3.5 text-[#2FBF71]" />
                            <span>{esim.network}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Bar for this eSIM */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        {/* QR Code Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedEsimForQr(esim)}
                          className="py-2.5 px-3 rounded-xl bg-[#FFFFFF] border-2 border-[#123C2A] hover:bg-[#123C2A] hover:text-white text-[#123C2A] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <QrCode className="w-4 h-4 text-[#2FBF71]" />
                          <span>View QR Code</span>
                        </button>

                        {/* Simulate Data Usage (-500 MB) */}
                        <button
                          type="button"
                          onClick={() => handleUseData(esim.id)}
                          className="py-2.5 px-3 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] hover:border-[#123C2A] text-[#123C2A] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                          title="Simulate 500 MB data usage to watch the live bar update"
                        >
                          <TrendingDown className="w-3.5 h-3.5 text-[#5E6E66]" />
                          <span>Simulate Usage (-500MB)</span>
                        </button>

                        {/* Quick Top-Up */}
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleTopUp(esim.id, 1)}
                            className="flex-1 py-2 px-1.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                          >
                            <PlusCircle className="w-3 h-3" />
                            <span>+1 GB</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTopUp(esim.id, 3)}
                            className="flex-1 py-2 px-1.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                          >
                            <PlusCircle className="w-3 h-3" />
                            <span>+3 GB</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTopUp(esim.id, 10)}
                            className="flex-1 py-2 px-1.5 rounded-xl bg-[#123C2A] hover:bg-[#1A523A] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                          >
                            <Zap className="w-3 h-3 text-[#2FBF71]" />
                            <span>+10 GB</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeTab === "orders" && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#123C2A] uppercase tracking-wider mb-2">
                Order Invoices &amp; Top-Ups ({user.orderHistory.length})
              </div>

              {user.orderHistory.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-[#F5F7F2] p-4 rounded-2xl border border-[#E0E7E2] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E0E7E2] text-[#2FBF71] flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold text-[#123C2A]">
                        {order.planName}
                      </div>
                      <div className="text-[10px] text-[#5E6E66]">
                        {order.orderId} • {order.date} • ICCID: {order.iccid.slice(-6)}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-extrabold text-[#123C2A]">
                      {order.amountFormatted}
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1]">
                      Paid &amp; Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ACCOUNT SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-4">
              <div className="bg-[#F5F7F2] p-4 rounded-2xl border border-[#E0E7E2] space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#123C2A]">
                  Account Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-[#5E6E66] block">Full Name</span>
                    <span className="font-bold text-[#123C2A]">{user.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5E6E66] block">Email Address</span>
                    <span className="font-bold text-[#123C2A]">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5E6E66] block">Authentication Provider</span>
                    <span className="font-bold text-[#123C2A] capitalize">{user.provider}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5E6E66] block">Member Since</span>
                    <span className="font-bold text-[#123C2A]">{user.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Log Out Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center gap-2 border border-red-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of SproutSIM</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer with Support */}
        <div className="p-4 bg-[#F5F7F2] border-t border-[#E0E7E2] flex items-center justify-between text-xs text-[#5E6E66] flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2FBF71]" />
            <span>SproutSIM Roaming Protected</span>
          </div>

          <a
            href="https://wa.me/923086379663?text=Hi%20SproutSIM%2C%20I%20need%20help%20with%20my%20active%20eSIM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#123C2A] hover:text-[#2FBF71] font-bold text-xs flex items-center gap-1 transition-colors"
          >
            24/7 WhatsApp Support &rarr;
          </a>
        </div>

      </div>

      {/* SUB-MODAL: QR CODE VIEWER */}
      {selectedEsimForQr && (
        <div className="fixed inset-0 z-60 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-2 border-[#123C2A] shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-[#123C2A]">
                {selectedEsimForQr.planName} QR Code
              </h4>
              <button
                onClick={() => setSelectedEsimForQr(null)}
                className="w-7 h-7 rounded-full bg-[#F5F7F2] hover:bg-[#E0E7E2] text-[#123C2A] flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* QR Box */}
            <div className="bg-[#F5F7F2] p-4 rounded-2xl border border-[#E0E7E2] inline-block">
              <div className="w-40 h-40 bg-white p-2 rounded-xl border border-[#E0E7E2] flex items-center justify-center mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="5" y="5" width="28" height="28" fill="#123C2A" rx="3" />
                  <rect x="9" y="9" width="20" height="20" fill="#FFFFFF" rx="2" />
                  <rect x="13" y="13" width="12" height="12" fill="#2FBF71" rx="1" />

                  <rect x="67" y="5" width="28" height="28" fill="#123C2A" rx="3" />
                  <rect x="71" y="9" width="20" height="20" fill="#FFFFFF" rx="2" />
                  <rect x="75" y="13" width="12" height="12" fill="#2FBF71" rx="1" />

                  <rect x="5" y="67" width="28" height="28" fill="#123C2A" rx="3" />
                  <rect x="9" y="71" width="20" height="20" fill="#FFFFFF" rx="2" />
                  <rect x="13" y="75" width="12" height="12" fill="#2FBF71" rx="1" />

                  <rect x="38" y="10" width="8" height="8" fill="#123C2A" />
                  <rect x="50" y="10" width="8" height="8" fill="#2FBF71" />
                  <rect x="38" y="24" width="8" height="8" fill="#2FBF71" />
                  <rect x="50" y="24" width="8" height="8" fill="#123C2A" />
                  <rect x="10" y="38" width="8" height="8" fill="#123C2A" />
                  <rect x="24" y="38" width="8" height="8" fill="#2FBF71" />
                  <rect x="38" y="38" width="8" height="8" fill="#123C2A" />
                  <rect x="50" y="38" width="8" height="8" fill="#123C2A" />
                  <rect x="64" y="38" width="8" height="8" fill="#2FBF71" />
                  <rect x="78" y="38" width="8" height="8" fill="#123C2A" />
                  <rect x="38" y="52" width="8" height="8" fill="#2FBF71" />
                  <rect x="50" y="52" width="8" height="8" fill="#123C2A" />
                  <rect x="64" y="52" width="8" height="8" fill="#2FBF71" />
                  <rect x="78" y="52" width="8" height="8" fill="#123C2A" />
                </svg>
              </div>
            </div>

            <div className="text-xs text-[#5E6E66]">
              Scan in <strong>Settings &rarr; Cellular &rarr; Add eSIM</strong>
            </div>

            <div className="bg-[#F5F7F2] p-2.5 rounded-xl border border-[#E0E7E2] text-[10px] font-mono text-[#123C2A] break-all">
              {selectedEsimForQr.qrCodeValue}
            </div>

            <button
              onClick={() => setSelectedEsimForQr(null)}
              className="w-full py-2.5 rounded-xl bg-[#123C2A] text-white text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
