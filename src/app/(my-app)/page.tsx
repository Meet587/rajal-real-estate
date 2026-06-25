import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Rajal Realty: Your Partner in Property &amp; Investment
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Modern Sanctuary design system and layout shell are ready. Marketing
          pages arrive in Phase 2.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild>
            <Link href="/properties">Explore Properties &amp; Investments</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Design System Check</CardTitle>
            <CardDescription>
              Sage primary, Terracotta accent, 16px card radius, soft shadow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="inline-flex items-center rounded-[8px] bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
              RERA Verified
            </span>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
