import React from "react";

interface LogoProps {
  className?: string;
  variant?: "dark" | "white" | "iconOnly";
  size?: "sm" | "md" | "lg";
}

export function SproutSimIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Globe base */}
      <circle cx="24" cy="24" r="18" fill="#123C2A" />
      
      {/* Globe continents / grid lines in mint */}
      <path
        d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42"
        stroke="#2FBF71"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M12 16C16 19 21 18 24 16C27 14 31 16 34 18"
        stroke="#A7E8C1"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9 25C14 27 18 25 22 23C26 21 31 23 37 25"
        stroke="#A7E8C1"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 34C18 32 23 34 26 33C29 32 32 33 35 32"
        stroke="#A7E8C1"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Sprouting leaf 1 (Left curve) */}
      <path
        d="M14 36C12 28 14 18 22 12C20 18 21 27 14 36Z"
        fill="#2FBF71"
      />
      <path
        d="M14 36C17 26 23 18 22 12"
        stroke="#123C2A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Sprouting leaf 2 (Right curve) */}
      <path
        d="M24 37C23 27 28 17 38 12C36 19 35 28 24 37Z"
        fill="#2FBF71"
      />
      <path
        d="M24 37C29 27 34 18 38 12"
        stroke="#123C2A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Orbit ring around sprout */}
      <ellipse
        cx="24"
        cy="24"
        rx="22"
        ry="8"
        transform="rotate(-24 24 24)"
        stroke="#2FBF71"
        strokeWidth="1.8"
        strokeDasharray="4 2"
      />
    </svg>
  );
}

export default function Logo({
  className = "",
  variant = "dark",
  size = "md",
}: LogoProps) {
  const isDark = variant === "white";

  const sizeClasses = {
    sm: { icon: "w-7 h-7", text: "text-lg", sub: "text-[9px]" },
    md: { icon: "w-9 h-9", text: "text-xl", sub: "text-[10px]" },
    lg: { icon: "w-12 h-12", text: "text-2xl", sub: "text-xs" },
  }[size];

  if (variant === "iconOnly") {
    return <SproutSimIcon className={sizeClasses.icon} />;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <SproutSimIcon className={sizeClasses.icon} />
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold tracking-tight ${sizeClasses.text} ${
            isDark ? "text-white" : "text-[#123C2A]"
          }`}
        >
          SPROUT<span className="text-[#2FBF71]">SİM</span>
        </span>
        <span
          className={`tracking-[0.16em] uppercase font-semibold mt-0.5 ${sizeClasses.sub} ${
            isDark ? "text-[#A7E8C1]" : "text-[#5E6E66]"
          }`}
        >
          Stay Connected Anywhere.
        </span>
      </div>
    </div>
  );
}
