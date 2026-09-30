import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "dark" | "white" | "iconOnly";
  size?: "sm" | "md" | "lg";
}

// SVG recreation of the real logo: globe with two leaves + orbit ring
// Matches the exact design from the brand image
export function SproutSimIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Dark green rounded background */}
      <rect width="64" height="64" rx="14" fill="#123C2A" />

      {/* Globe body */}
      <circle cx="32" cy="26" r="16" fill="#2FBF71" />

      {/* Globe continent highlights (light mint) */}
      <path
        d="M22 16C25 14 30 15 34 17C31 15 26 14 22 16Z"
        fill="#A7E8C1"
        opacity="0.8"
      />
      <path
        d="M19 22C22 20 27 21 30 23C26 21 21 21 19 22Z"
        fill="#A7E8C1"
        opacity="0.6"
      />
      <path
        d="M34 20C37 21 40 24 39 28C38 24 36 21 34 20Z"
        fill="#A7E8C1"
        opacity="0.6"
      />
      <path
        d="M24 26C27 25 30 26 32 28C29 26 26 25 24 26Z"
        fill="#A7E8C1"
        opacity="0.5"
      />

      {/* Globe outline */}
      <circle cx="32" cy="26" r="16" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />

      {/* Orbit ring */}
      <ellipse
        cx="32"
        cy="26"
        rx="22"
        ry="6"
        stroke="white"
        strokeWidth="2"
        fill="none"
        opacity="0.85"
      />

      {/* Left leaf */}
      <path
        d="M20 42C16 36 15 30 18 26C19 30 21 35 20 42Z"
        fill="#2FBF71"
      />
      <path
        d="M20 42C14 36 13 28 20 22C19 28 20 35 20 42Z"
        fill="#26A561"
      />
      {/* Left leaf vein */}
      <path d="M20 42C18 36 17 30 18 26" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

      {/* Right leaf */}
      <path
        d="M44 42C48 36 49 30 46 26C45 30 43 35 44 42Z"
        fill="#2FBF71"
      />
      <path
        d="M44 42C50 36 51 28 44 22C45 28 44 35 44 42Z"
        fill="#26A561"
      />
      {/* Right leaf vein */}
      <path d="M44 42C46 36 47 30 46 26" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

      {/* Center stem between leaves */}
      <path
        d="M32 52C30 46 28 42 28 38C30 40 32 44 32 52Z"
        fill="#26A561"
      />
      <path
        d="M32 52C34 46 36 42 36 38C34 40 32 44 32 52Z"
        fill="#2FBF71"
      />
    </svg>
  );
}

// Image-based logo using the actual brand file
export function SproutSimLogoImage({
  width = 36,
  height = 36,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src="/sproutsim-logo.jpg"
      alt="SproutSIM Logo"
      width={width}
      height={height}
      className={`rounded-xl object-cover ${className}`}
      priority
    />
  );
}

export default function Logo({
  className = "",
  variant = "dark",
  size = "md",
}: LogoProps) {
  const isDark = variant === "white";

  const sizeMap = {
    sm: { px: 28, text: "text-lg", sub: "text-[9px]" },
    md: { px: 36, text: "text-xl", sub: "text-[10px]" },
    lg: { px: 48, text: "text-2xl", sub: "text-xs" },
  }[size];

  if (variant === "iconOnly") {
    return (
      <SproutSimLogoImage width={sizeMap.px} height={sizeMap.px} />
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Use real brand image as icon */}
      <SproutSimLogoImage width={sizeMap.px} height={sizeMap.px} />
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold tracking-tight ${sizeMap.text} ${
            isDark ? "text-white" : "text-[#123C2A]"
          }`}
        >
          SPROUT<span className="text-[#2FBF71]">SIM</span>
        </span>
        <span
          className={`tracking-[0.16em] uppercase font-semibold mt-0.5 ${sizeMap.sub} ${
            isDark ? "text-[#A7E8C1]" : "text-[#5E6E66]"
          }`}
        >
          Stay Connected Anywhere.
        </span>
      </div>
    </div>
  );
}
