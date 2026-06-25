🏛️ The Modern Sanctuary: Design System
This system is designed to be implemented using Tailwind CSS variables, integrating directly into your globals.css and tailwind.config.js for use with shadcn/ui.

1. Color Palette (Tailwind Tokens)
:root {
  /* Background & Surfaces */
  --background: 40 18% 97%;    /* #F9F8F6 - Warm Alabaster */
  --foreground: 100 6% 18%;    /* #2C302B - Deep Olive Black */
  --card: 0 0% 100%;           /* #FFFFFF */
  --card-foreground: 100 6% 18%;
  --popover: 0 0% 100%;
  --popover-foreground: 100 6% 18%;

  /* Brand Colors */
  --primary: 96 15% 39%;       /* #5E7153 - Sage Green */
  --primary-foreground: 40 18% 97%;
  --secondary: 90 4% 56%;      /* #8E938B - Ash Green */
  --secondary-foreground: 100 6% 18%;
  --accent: 32 45% 61%;        /* #C89F70 - Muted Terracotta */
  --accent-foreground: 0 0% 100%;

  /* UI States */
  --muted: 90 4% 92%;
  --muted-foreground: 90 4% 45%;
  --border: 90 4% 85%;
  --input: 90 4% 85%;
  --ring: 96 15% 39%;
  
  /* Radius */
  --radius: 1rem;              /* 16px for a soft, sanctuary feel */
}
2. Typography Hierarchy
Headings (Display): Lora (Serif). Use for hero titles and section headers to convey an editorial, high-end tone.
Body & UI: DM Sans (Sans-serif). A clean, geometric sans that ensures readability across property details and data points.
3. Component Style Guide (shadcn/ui Customization)
Cards: Utilize a 16px border radius with a very soft, diffuse shadow (shadow-soft) to avoid a "boxy" feel.
Buttons: Maintain an 8px radius. Use the Sage Green (--primary) for primary actions and the Terracotta (--accent) specifically for RERA-verified badges or critical trust signals.
Spacing: Adopt a generous spacing scale (e.g., 80px between major sections) to provide the "breathing room" essential to the Sanctuary aesthetic.