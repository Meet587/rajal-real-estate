import { Home, KeyRound, Tag, type LucideIcon } from "lucide-react";

import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

const services: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Home,
    title: "Property Buying",
    description:
      "Find your dream home or ideal investment property with our expert guidance and extensive listings.",
  },
  {
    icon: Tag,
    title: "Property Selling",
    description:
      "Maximize your property's value and reach the right buyers through our strategic marketing and negotiation skills.",
  },
  {
    icon: KeyRound,
    title: "Property Rentals",
    description:
      "Secure reliable tenants or find the perfect rental property with our comprehensive management and screening services.",
  },
];

export function ServicesSection() {
  return (
    <Section id="services" className="py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          What we do
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight md:text-4xl">
          Our Core Real Estate Services
        </h2>
      </div>

      <div className="mt-10 divide-y divide-border border-y-2 border-border">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <article
              key={service.title}
              className="group grid gap-6 py-8 md:grid-cols-[4.5rem_1fr_auto] md:items-start md:gap-10 md:py-10"
            >
              <span
                className="font-heading text-4xl font-semibold leading-none text-primary/25 transition-colors group-hover:text-primary/50 md:text-5xl"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-heading text-xl font-semibold md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2.5 max-w-prose font-medium leading-snug text-foreground/75">
                  {service.description}
                </p>
              </div>
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-[calc(var(--radius)*0.5)] border-2 border-border bg-card transition-colors",
                  "group-hover:border-primary/40 group-hover:bg-primary/8 md:mt-1",
                )}
                aria-hidden="true"
              >
                <Icon className="size-5 text-primary" strokeWidth={2} />
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
