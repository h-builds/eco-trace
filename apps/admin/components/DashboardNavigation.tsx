"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DemoScenario } from "../lib/demoScenario";
import { getConsumerProductUrl } from "../lib/consumer";

export interface NavLink {
  name: string;
  href: string;
}

export function DashboardNavigation() {
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { name: "Overview", href: "/dashboard/overview" },
    { name: "Trusted Actors & Assets", href: "/dashboard/entities" },
    { name: "Integrity Events", href: "/dashboard/events" },
    { name: "Compliance Export", href: "/dashboard/compliance" },
  ];

  return (
    <nav className="ml-8 flex gap-4">
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              isActive
                ? "text-brand-integrity-green"
                : "text-brand-deep-charcoal hover:text-brand-integrity-green"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}

export interface StepperLink {
  label: string;
  href: string;
  external?: boolean;
}

export function GuidedDemoStepper() {
  const pathname = usePathname();
  const consumerUrl = getConsumerProductUrl(DemoScenario.assetId);
  const caseStudyUrl = process.env.NEXT_PUBLIC_CASE_STUDY_URL || "/docs/case-study";

  const steps: StepperLink[] = [
    { label: "1. Review system health", href: "/dashboard/overview" },
    { label: "2. Inspect trusted actors", href: "/dashboard/entities" },
    { label: "3. Verify event integrity", href: "/dashboard/events" },
    { label: "4. Export evidence", href: "/dashboard/compliance" },
    { label: "5. Open consumer view", href: consumerUrl, external: true },
  ];

  return (
    <div className="bg-surface-card border-b border-surface-border w-full py-3 px-6 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 overflow-x-auto w-full">
        <span className="text-xs font-bold text-functional-neutral uppercase tracking-wider whitespace-nowrap mr-2">Guided Demo:</span>
        <div className="flex items-center gap-2">
          {steps.map((step, index) => {
            const isActive = !step.external && pathname.startsWith(step.href);
            return (
              <div key={step.label} className="flex items-center">
                <Link
                  href={step.href}
                  target={step.external ? "_blank" : undefined}
                  rel={step.external ? "noopener noreferrer" : undefined}
                  className={`text-xs px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-brand-integrity-green text-brand-deep-charcoal font-bold"
                      : "bg-surface-canvas text-functional-neutral hover:bg-surface-border hover:text-brand-deep-charcoal"
                  }`}
                  title={step.external && consumerUrl === '#' ? "Consumer App URL not configured" : undefined}
                >
                  {step.label}
                </Link>
                {index < steps.length - 1 && (
                  <div className="w-4 h-[1px] bg-surface-border mx-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href={caseStudyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-functional-neutral hover:text-brand-deep-charcoal underline underline-offset-2"
        >
          Architecture Case Study
        </Link>
        <Link
          href={consumerUrl}
          target={consumerUrl !== '#' ? "_blank" : undefined}
          rel={consumerUrl !== '#' ? "noopener noreferrer" : undefined}
          className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors ${
            consumerUrl !== '#'
              ? "bg-brand-deep-charcoal text-surface-card hover:bg-opacity-90"
              : "bg-surface-border text-functional-neutral cursor-not-allowed"
          }`}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            if (consumerUrl === '#') {
              e.preventDefault();
            }
          }}
        >
          {consumerUrl !== '#' ? "Open Consumer Verification App" : "Consumer App Offline (Missing URL)"}
        </Link>
      </div>
    </div>
  );
}
