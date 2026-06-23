import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "alert" | "success";
}

export function MetricCard({ title, value, description, trend, trendValue, variant = "default" }: MetricCardProps) {
  let valueColorClass = "text-brand-deep-charcoal";
  if (variant === "alert") valueColorClass = "text-functional-alert";
  if (variant === "success") valueColorClass = "text-brand-verification-green";

  return (
    <div className="bg-surface-card p-6 rounded-lg shadow-elevation-1 border border-surface-border flex flex-col gap-2 transition-transform hover:-translate-y-1 hover:shadow-subtle duration-200">
      <h3 className="text-sm font-medium text-functional-neutral uppercase tracking-wider">{title}</h3>
      <div className={`text-xl font-bold ${valueColorClass}`}>{value}</div>
      {(description || trendValue) && (
        <div className="flex items-center gap-2 mt-2">
          {trendValue && (
            <span className={`text-xs font-medium px-2 py-1 rounded-pill ${
              trend === "up" ? "bg-functional-alert/10 text-functional-alert" :
              trend === "down" ? "bg-brand-verification-green/10 text-brand-verification-green" :
              "bg-surface-canvas text-functional-neutral"
            }`}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "−"} {trendValue}
            </span>
          )}
          {description && <span className="text-xs text-functional-neutral">{description}</span>}
        </div>
      )}
    </div>
  );
}
