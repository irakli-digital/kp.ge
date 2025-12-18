"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface KeyTakeawayProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function KeyTakeaway({ children, title, className }: KeyTakeawayProps) {
  return (
    <div className={cn("key-takeaway", className)}>
      {title && <span className="takeaway-title">{title}</span>}
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  );
}
