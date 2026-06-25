import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[calc(var(--radius)*1.1)] bg-foreground px-5 py-12 text-background shadow-soft sm:px-8 sm:py-14 md:px-12 md:py-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-14 lg:py-20 xl:gap-12">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-accent/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative min-w-0 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-background/70">
              Start the conversation
            </p>
            <h2 className="mt-3 max-w-xl font-heading text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-[2.75rem]">
              Ready to find your perfect property or investment?
            </h2>
            <p className="mt-4 max-w-lg text-sm font-medium leading-snug text-background/85 sm:text-base">
              Let Rajal Realty guide you through every step. Contact us today
              for a personalized consultation or explore our current listings.
            </p>
          </div>

          <div className="relative mt-8 w-full min-w-0 sm:mt-10 lg:col-span-5 lg:mt-0">
            <div className="flex w-full max-w-full flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-11 w-full max-w-full bg-background px-4 py-3 text-center font-semibold whitespace-normal text-foreground shadow-[0_2px_10px_-2px_rgba(0,0,0,0.25)] hover:bg-background/92 sm:px-5"
              >
                <Link href="/contact">Contact Us Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto min-h-11 w-full max-w-full border-2 border-background/35 bg-transparent px-4 py-3 text-center font-semibold whitespace-normal text-background hover:bg-background/12 hover:text-background sm:px-5"
              >
                <Link href="/properties">View Properties</Link>
              </Button>
            </div>

            <a
              href="mailto:rajal.associate@gmail.com"
              className="group mt-6 inline-flex max-w-full items-start gap-2 break-all text-sm font-semibold text-background/80 transition-colors hover:text-background sm:items-center sm:break-normal"
            >
              rajal.associate@gmail.com
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
