import Image from "next/image";

const HERO_IMAGE = "/clay-banks-urH155LONWs-unsplash.jpg";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-bg-image absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background/97 via-background/92 to-background/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40" />
    </div>
  );
}
