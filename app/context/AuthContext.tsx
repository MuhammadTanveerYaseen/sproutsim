"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PakistanPackage } from "../data/destinations";

export interface UserEsim {
  id: string;
  iccid: string;
  planName: string;
  dataTotalMB: number;     // e.g. 10240 for 10 GB
  dataUsedMB: number;      // e.g. 3680 for 3.6 GB
  dataRemainingMB: number; // e.g. 6560 (6.4 GB)
  validityDays: number;
  activatedAt: string;
  expiresAt: string;
  status: "ACTIVE" | "EXPIRED" | "DEPLETED";
  country: string;
  network: string;
  qrCodeValue: string;
}

export interface UserOrder {
  orderId: string;
  planName: string;
  dataAllowance: string;
  amountFormatted: string;
  date: string;
  status: "COMPLETED" | "ACTIVE";
  iccid: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  provider: "email" | "google" | "apple";
  createdAt: string;
  activeEsims: UserEsim[];
  orderHistory: UserOrder[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithApple: () => Promise<boolean>;
  demoLogin: () => void;
  logout: () => void;
  addPurchasedEsim: (
    pkg: PakistanPackage,
    email: string,
    gloDetails?: {
      iccid?: string;
      lpaCode?: string;
      assignedOperator?: string;
      orderId?: string;
    }
  ) => void;
  topUpEsim: (esimId: string, additionalGB: number) => void;
  simulateDataUsage: (esimId: string, mbAmount: number) => void;
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: "usr_pk_994821",
  name: "Danyal Sheikh",
  email: "danyal.sheikh@example.com",
  phone: "+92 300 1234567",
  avatar: "DS",
  provider: "google",
  createdAt: "2026-09-01",
  activeEsims: [
    {
      id: "esim_pk_10gb_live",
      iccid: "8988228044928812901",
      planName: "10 GB Monthly Pro (4G)",
      dataTotalMB: 10240,       // 10 GB
      dataUsedMB: 3686,         // 3.6 GB
      dataRemainingMB: 6554,    // 6.4 GB
      validityDays: 30,
      activatedAt: "2026-09-22",
      expiresAt: "2026-10-22",
      status: "ACTIVE",
      country: "Pakistan",
      network: "GloEsim Enterprise Roaming • Jazz 4G LTE",
      qrCodeValue: "LPA:1$smdp.gloesim.com$GLO-PK-889123-ACTIVATION",
    },
  ],
  orderHistory: [
    {
      orderId: "ORD-9482-PK",
      planName: "10 GB Monthly Pro",
      dataAllowance: "10 GB",
      amountFormatted: "Rs 3,450",
      date: "Sep 22, 2026",
      status: "ACTIVE",
      iccid: "8992010244928812901",
    },
    {
      orderId: "ORD-7193-PK",
      planName: "3 GB Weekly Starter",
      dataAllowance: "3 GB",
      amountFormatted: "Rs 1,450",
      date: "Sep 05, 2026",
      status: "COMPLETED",
      iccid: "8992010244928812404",
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage or null
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sproutsim_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load user session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    try {
      if (u) {
        localStorage.setItem("sproutsim_user", JSON.stringify(u));
      } else {
        localStorage.removeItem("sproutsim_user");
      }
    } catch (e) {
      console.error("Failed to persist user session", e);
    }
  };

  const login = async (email: string): Promise<boolean> => {
    const existing = user?.email.toLowerCase() === email.toLowerCase() ? user : null;
    const activeProfile: UserProfile = existing || {
      ...DEFAULT_DEMO_USER,
      id: `usr_${Date.now()}`,
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      provider: "email",
    };
    saveUser(activeProfile);
    return true;
  };

  const signup = async (name: string, email: string): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      avatar: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U",
      provider: "email",
      createdAt: new Date().toISOString().split("T")[0],
      activeEsims: [
        {
          id: `esim_${Date.now()}`,
          iccid: `899201024${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          planName: "1 GB Starter Trial (4G)",
          dataTotalMB: 1024,
          dataUsedMB: 120,
          dataRemainingMB: 904,
          validityDays: 7,
          activatedAt: new Date().toISOString().split("T")[0],
          expiresAt: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
          status: "ACTIVE",
          country: "Pakistan",
          network: "GloEsim Enterprise Roaming • Jazz 4G LTE",
          qrCodeValue: `LPA:1$smdp.sproutsim.io$SPROUTSIM-PK-${Date.now()}`,
        },
      ],
      orderHistory: [
        {
          orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}-PK`,
          planName: "1 GB Starter Trial",
          dataAllowance: "1 GB",
          amountFormatted: "Rs 525",
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          status: "ACTIVE",
          iccid: `899201024${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        },
      ],
    };
    saveUser(newUser);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    const googleUser: UserProfile = {
      id: "usr_google_1029",
      name: "Muhammad Ali",
      email: "ali.traveler@gmail.com",
      avatar: "MA",
      provider: "google",
      createdAt: new Date().toISOString().split("T")[0],
      activeEsims: [
        {
          id: "esim_google_active",
          iccid: "8992010244988771234",
          planName: "10 GB Monthly Pro (4G)",
          dataTotalMB: 10240,
          dataUsedMB: 2840,
          dataRemainingMB: 7400,
          validityDays: 30,
          activatedAt: "2026-09-25",
          expiresAt: "2026-10-25",
          status: "ACTIVE",
          country: "Pakistan",
          network: "GloEsim Enterprise Roaming • Jazz 4G LTE",
          qrCodeValue: "LPA:1$smdp.sproutsim.io$SPROUTSIM-PK-GOOGLE",
        },
      ],
      orderHistory: [
        {
          orderId: "ORD-8219-PK",
          planName: "10 GB Monthly Pro",
          dataAllowance: "10 GB",
          amountFormatted: "Rs 3,450",
          date: "Sep 25, 2026",
          status: "ACTIVE",
          iccid: "8992010244988771234",
        },
      ],
    };
    saveUser(googleUser);
    return true;
  };

  const loginWithApple = async (): Promise<boolean> => {
    const appleUser: UserProfile = {
      id: "usr_apple_5510",
      name: "Apple Traveler",
      email: "traveler@privaterelay.appleid.com",
      avatar: "AT",
      provider: "apple",
      createdAt: new Date().toISOString().split("T")[0],
      activeEsims: [
        {
          id: "esim_apple_active",
          iccid: "8992010244911223344",
          planName: "20 GB Heavy Data Pro (4G)",
          dataTotalMB: 20480,
          dataUsedMB: 5120,
          dataRemainingMB: 15360,
          validityDays: 30,
          activatedAt: "2026-09-28",
          expiresAt: "2026-10-28",
          status: "ACTIVE",
          country: "Pakistan",
          network: "GloEsim Enterprise Roaming • Jazz 4G LTE",
          qrCodeValue: "LPA:1$smdp.sproutsim.io$SPROUTSIM-PK-APPLE",
        },
      ],
      orderHistory: [
        {
          orderId: "ORD-3321-PK",
          planName: "20 GB Heavy Data Pro",
          dataAllowance: "20 GB",
          amountFormatted: "Rs 5,950",
          date: "Sep 28, 2026",
          status: "ACTIVE",
          iccid: "8992010244911223344",
        },
      ],
    };
    saveUser(appleUser);
    return true;
  };

  const demoLogin = () => {
    saveUser(DEFAULT_DEMO_USER);
  };

  const logout = () => {
    saveUser(null);
  };

  const addPurchasedEsim = (
    pkg: PakistanPackage,
    email: string,
    gloDetails?: {
      iccid?: string;
      lpaCode?: string;
      assignedOperator?: string;
      orderId?: string;
    }
  ) => {
    let totalMB = 1024;
    if (pkg.data.includes("Unlimited")) totalMB = 102400;
    else {
      const match = pkg.data.match(/(\d+)/);
      if (match) totalMB = parseInt(match[1], 10) * 1024;
    }

    const validityDays = parseInt(pkg.validity.replace(/\D/g, ""), 10) || 30;
    const now = new Date();
    const expiry = new Date(now.getTime() + validityDays * 86400000);
    const newIccid = gloDetails?.iccid || `89882280${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    const newEsim: UserEsim = {
      id: `esim_${Date.now()}`,
      iccid: newIccid,
      planName: `${pkg.name} (${pkg.data})`,
      dataTotalMB: totalMB,
      dataUsedMB: 0,
      dataRemainingMB: totalMB,
      validityDays,
      activatedAt: now.toISOString().split("T")[0],
      expiresAt: expiry.toISOString().split("T")[0],
      status: "ACTIVE",
      country: "Pakistan",
      network: gloDetails?.assignedOperator || "GloEsim Enterprise Roaming • Jazz 4G LTE",
      qrCodeValue: gloDetails?.lpaCode || `LPA:1$smdp.gloesim.com$${newIccid}`,
    };

    const newOrder: UserOrder = {
      orderId: gloDetails?.orderId || `ORD-${Math.floor(1000 + Math.random() * 9000)}-PK`,
      planName: pkg.name,
      dataAllowance: pkg.data,
      amountFormatted: `Rs ${pkg.pricePKR.toLocaleString()}`,
      date: now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "ACTIVE",
      iccid: newIccid,
    };

    if (user) {
      const updated: UserProfile = {
        ...user,
        activeEsims: [newEsim, ...user.activeEsims],
        orderHistory: [newOrder, ...user.orderHistory],
      };
      saveUser(updated);
    } else {
      const autoUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        avatar: email.slice(0, 2).toUpperCase(),
        provider: "email",
        createdAt: now.toISOString().split("T")[0],
        activeEsims: [newEsim],
        orderHistory: [newOrder],
      };
      saveUser(autoUser);
    }
  };

  const topUpEsim = (esimId: string, additionalGB: number) => {
    if (!user) return;
    const addMB = additionalGB * 1024;
    const updatedEsims = user.activeEsims.map((esim) => {
      if (esim.id === esimId) {
        return {
          ...esim,
          dataTotalMB: esim.dataTotalMB + addMB,
          dataRemainingMB: esim.dataRemainingMB + addMB,
          status: "ACTIVE" as const,
        };
      }
      return esim;
    });

    const newOrder: UserOrder = {
      orderId: `TOP-${Math.floor(1000 + Math.random() * 9000)}-PK`,
      planName: `Top-Up +${additionalGB} GB Data`,
      dataAllowance: `+${additionalGB} GB`,
      amountFormatted: `Rs ${(additionalGB * 450).toLocaleString()}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "ACTIVE",
      iccid: user.activeEsims.find((e) => e.id === esimId)?.iccid || "899201...",
    };

    saveUser({
      ...user,
      activeEsims: updatedEsims,
      orderHistory: [newOrder, ...user.orderHistory],
    });
  };

  const simulateDataUsage = (esimId: string, mbAmount: number) => {
    if (!user) return;
    const updatedEsims = user.activeEsims.map((esim) => {
      if (esim.id === esimId) {
        const newUsed = Math.min(esim.dataTotalMB, esim.dataUsedMB + mbAmount);
        const newRemaining = Math.max(0, esim.dataTotalMB - newUsed);
        return {
          ...esim,
          dataUsedMB: newUsed,
          dataRemainingMB: newRemaining,
          status: newRemaining === 0 ? ("DEPLETED" as const) : ("ACTIVE" as const),
        };
      }
      return esim;
    });

    saveUser({
      ...user,
      activeEsims: updatedEsims,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        loginWithApple,
        demoLogin,
        logout,
        addPurchasedEsim,
        topUpEsim,
        simulateDataUsage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
