import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroBackground } from "@/components/home/hero-background";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[min(60vh,560px)] overflow-hidden border-b border-border">
      <HeroBackground />

      <div className="relative z-10 container mx-auto grid items-center gap-12 px-4 py-14 md:py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Rajal Realty · Ahmedabad
          </p>
          <h1 className="mt-4 max-w-2xl font-heading text-[2.35rem] font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.35rem]">
            Your partner in{" "}
            <span className="text-primary">property</span> &amp; investment
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-snug text-foreground/80 md:text-lg">
            Navigating the world of real estate with expertise. We specialize in
            buying, selling, rentals, and unique investment opportunities
            tailored for you.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="min-h-11 w-full sm:w-auto">
              <Link href="/properties">
                Explore Properties &amp; Investments
              </Link>
            </Button>
            <Link
              href="/contact"
              className="group inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary sm:justify-start"
            >
              Book a consultation
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-7 text-sm font-medium text-foreground/85">
            <li className="flex items-center gap-2.5">
              <span
                className="size-2 rounded-full bg-primary"
                aria-hidden="true"
              />
              Residential &amp; commercial
            </li>
            <li className="flex items-center gap-2.5">
              <span
                className="size-2 rounded-full bg-accent"
                aria-hidden="true"
              />
              Investment advisory
            </li>
            <li className="flex items-center gap-2.5">
              <span
                className="size-2 rounded-full bg-secondary"
                aria-hidden="true"
              />
              Ahmedabad focused
            </li>
          </ul>
        </div>

        <div className="flex items-end lg:col-span-5 lg:justify-end">
          <div className="hero-expertise-card w-full max-w-sm lg:translate-y-4">
            <div className="hero-expertise-card-beam" aria-hidden="true" />
            <div className="hero-expertise-card-content p-5 shadow-soft">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-primary">
                Local expertise
              </p>
              <p className="mt-2 font-heading text-lg font-semibold leading-snug text-foreground">
                Deep roots in Ahmedabad&apos;s real estate market
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
