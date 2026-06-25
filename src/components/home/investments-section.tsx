import {
  Building2,
  Map,
  Palmtree,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

const investments: {
  icon: LucideIcon;
  title: string;
  description: string;
  span: string;
  featured?: boolean;
}[] = [
  {
    icon: TrendingUp,
    title: "Buyback Deals",
    description:
      "Secure investments with guaranteed returns through our exclusive property buyback agreements.",
    span: "sm:col-span-2 lg:col-span-7",
    featured: true,
  },
  {
    icon: Building2,
    title: "Pre-Lease Properties",
    description:
      "Invest in commercial properties with tenants already secured, ensuring immediate rental income.",
    span: "lg:col-span-5",
  },
  {
    icon: Map,
    title: "Plotting",
    description:
      "Acquire strategically located land parcels with high appreciation potential for future development.",
    span: "lg:col-span-4",
  },
  {
    icon: Palmtree,
    title: "Weekend Villas",
    description:
      "Own a luxurious getaway home perfect for relaxation or generating rental income.",
    span: "lg:col-span-4",
  },
  {
    icon: Rocket,
    title: "Pre-Launch Projects",
    description:
      "Gain early access to promising new developments at preferential rates before public launch.",
    span: "lg:col-span-4",
  },
];

export function InvestmentsSection() {
  return (
    <Section
      id="investments"
      className="border-y-2 border-border bg-muted/55 py-16 md:py-24"
    >
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Beyond the ordinary
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight md:text-4xl">
          Explore Unique Investment Opportunities
        </h2>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {investments.map((investment) => {
          const Icon = investment.icon;
          return (
            <li key={investment.title} className={cn("list-none", investment.span)}>
              <article className="investment-card group h-full">
                <div className="investment-card-beam" aria-hidden="true" />
                <div
                  className={cn(
                    "investment-card-content flex h-full flex-col justify-between p-6 md:p-7",
                    investment.featured && "lg:min-h-[280px] lg:p-8",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-[calc(var(--radius)*0.5)] border-2 border-border bg-background transition-colors duration-200 group-hover:border-primary/40 group-hover:bg-primary/8",
                        investment.featured ? "size-12" : "size-10",
                      )}
                      aria-hidden="true"
                    >
                      <Icon
                        className={cn(
                          "text-primary transition-transform duration-200 group-hover:scale-110",
                          investment.featured ? "size-6" : "size-5",
                        )}
                        strokeWidth={2}
                      />
                    </div>
                    {investment.featured ? (
                      <span className="rounded-full border border-accent/40 bg-accent px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent-foreground transition-transform duration-200 group-hover:scale-105">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-8">
                    <h3
                      className={cn(
                        "font-heading font-semibold transition-colors duration-200 group-hover:text-primary",
                        investment.featured ? "text-2xl" : "text-xl",
                      )}
                    >
                      {investment.title}
                    </h3>
                    <p className="mt-2.5 text-sm font-medium leading-snug text-foreground/75 transition-colors duration-200 group-hover:text-foreground/90 md:text-[0.9375rem]">
                      {investment.description}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
