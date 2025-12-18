"use client";

import { cn } from "@/lib/utils";

interface Competitor {
  name: string;
  price: number;
}

interface PricingComparisonProps {
  competitors: Competitor[];
  ourName: string;
  ourPrice: number;
  currency?: string;
  period?: string;
  savingsText?: string;
  className?: string;
}

export function PricingComparison({
  competitors,
  ourName,
  ourPrice,
  currency = "$",
  period = "თვეში",
  savingsText,
  className,
}: PricingComparisonProps) {
  const totalCompetitorPrice = competitors.reduce((sum, c) => sum + c.price, 0);
  const savingsPercent = Math.round(
    ((totalCompetitorPrice - ourPrice) / totalCompetitorPrice) * 100
  );

  return (
    <div className={cn("pricing-comparison", className)}>
      <div className="competitors">
        {competitors.map((competitor, index) => (
          <span key={competitor.name}>
            <span className="price-tag">
              {competitor.name} {currency}
              {competitor.price}
            </span>
            {index < competitors.length - 1 && (
              <span className="operator"> + </span>
            )}
          </span>
        ))}
        <span className="operator"> = </span>
      </div>
      <div className="total-old">
        {currency}
        {totalCompetitorPrice}/{period}
      </div>
      <div className="total-new">
        {ourName}: {currency}
        {ourPrice}/{period}
      </div>
      <div className="savings-badge">
        {savingsText || `დაზოგე ${savingsPercent}%`}
      </div>
    </div>
  );
}

// Example usage data for reference
export const examplePricingData = {
  competitors: [
    { name: "ChatGPT", price: 20 },
    { name: "Claude", price: 20 },
    { name: "Gemini", price: 20 },
  ],
  ourName: "Mypen",
  ourPrice: 29,
};
