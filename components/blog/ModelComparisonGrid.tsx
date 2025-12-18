"use client";

import { cn } from "@/lib/utils";

interface Model {
  name: string;
  icon: string;
  description: string;
  badge?: string;
  stars: number;
  highlighted?: boolean;
}

interface ModelComparisonGridProps {
  models: Model[];
  className?: string;
}

export function ModelComparisonGrid({ models, className }: ModelComparisonGridProps) {
  return (
    <div className={cn("model-comparison-grid", className)}>
      {models.map((model, index) => (
        <div
          key={index}
          className={cn("feature-card", model.highlighted && "highlighted")}
        >
          <div className="card-icon">{model.icon}</div>
          {model.badge && <span className="badge">{model.badge}</span>}
          <h4>{model.name}</h4>
          <p className="card-description">{model.description}</p>
          <div className="stars">
            {"★".repeat(model.stars)}
            {"☆".repeat(5 - model.stars)}
          </div>
        </div>
      ))}
    </div>
  );
}

// Example usage data for reference
export const exampleModels: Model[] = [
  {
    name: "GPT-4",
    icon: "🧠",
    description: "საუკეთესო ლოგიკისა და კოდისთვის",
    stars: 5,
  },
  {
    name: "Claude 3.5",
    icon: "✍️",
    description: "საუკეთესო ქართულისთვის",
    badge: "ქართულში საუკეთესო",
    stars: 5,
    highlighted: true,
  },
  {
    name: "Gemini",
    icon: "📊",
    description: "საუკეთესო მონაცემებისთვის",
    stars: 4,
  },
];
