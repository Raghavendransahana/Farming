"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AuthBackgroundProps {
  children: ReactNode;
  className?: string;
}

export const AuthBackground = ({ children, className }: AuthBackgroundProps) => {
  return (
    <div className={cn("min-h-screen w-full relative", className)}>
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, #2B8A3E 0%, #40C057 50%, #69DB7C 100%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default AuthBackground;
