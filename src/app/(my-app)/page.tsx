import { CtaSection } from "@/components/home/cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { InvestmentsSection } from "@/components/home/investments-section";
import { ServicesSection } from "@/components/home/services-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <InvestmentsSection />
      <CtaSection />
    </>
  );
}
