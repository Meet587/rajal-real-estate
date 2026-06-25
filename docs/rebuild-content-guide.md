# Rajal Realty — Rebuild Content Guide

Content extracted from the current site for rebuilding from scratch.  
**Scope:** Home (`/`), About (`/about`), Contact (`/contact`), and shared layout/navigation.  
**Excluded:** Property listings page and all property-specific content.

---

## 1. Brand & Site Identity

| Field | Value |
|-------|-------|
| **Business name** | Rajal Realty |
| **Full name (About page)** | Rajal Realty and Financial Services |
| **App / product name** | RealtyReach |
| **Tagline (Footer)** | Your Trusted Partner in Real Estate. |
| **Location focus** | Ahmedabad, Gujarat, India |
| **Language** | English (`lang="en"`) |
| **Logo** | `/logo.svg` — alt text: `Rajal Realty Logo` |

### SEO Metadata (from root layout)

- **Title:** `RealtyReach - Rajal Realty`
- **Description:** `Your trusted partner in property buying, selling, rentals, and unique real estate investments.`

### Brand Colors (from design system)

| Role | Color | Hex |
|------|-------|-----|
| Primary | Deep blue | `#003366` |
| Secondary | Light gray | `#F0F0F0` |
| Accent | Teal | `#008080` |

---

## 2. Site Structure & Navigation

### Routes (in scope for this doc)

| Route | Label | Purpose |
|-------|-------|---------|
| `/` | Home | Landing page |
| `/about` | About Us | Company story & mission |
| `/contact` | Contact Us | Inquiry form & contact details |

> **Note:** Navbar also links to `/properties`, but property page content is out of scope for this document.

### Navbar Links

| Label | Path | Icon |
|-------|------|------|
| Home | `/` | Home |
| Properties | `/properties` | Building |
| About Us | `/about` | Info |
| Contact Us | `/contact` | Mail |

### Global Layout

Every page includes:

1. **Navbar** (sticky top, desktop + mobile sheet menu)
2. **Page content**
3. **Footer**
4. **Toast notifications** (used on Contact form submit)

---

## 3. Home Page (`/`)

**Page structure (top to bottom):**

```
Navbar
  → Hero Section
  → Services Section
  → Investment Section
  → CTA Section
  → Footer
```

> Testimonials section is commented out / not implemented.

---

### 3.1 Hero Section

| Element | Content |
|---------|---------|
| **Headline (H1)** | Rajal Realty: Your Partner in Property & Investment |
| **Subheadline** | Navigating the world of real estate with expertise. We specialize in buying, selling, rentals, and unique investment opportunities tailored for you. |
| **Primary CTA button** | Explore Properties & Investments |
| **CTA link** | `/properties` |
| **Background image alt** | Modern architecture background |
| **Visual note** | Full-width hero (~60vh, min 400px), gradient overlay (primary → blue-800), optional background image at 20% opacity |

---

### 3.2 Services Section

**Section heading (H2):** Our Core Real Estate Services

| # | Title | Description | Icon |
|---|-------|-------------|------|
| 1 | Property Buying | Find your dream home or ideal investment property with our expert guidance and extensive listings. | Home |
| 2 | Property Selling | Maximize your property's value and reach the right buyers through our strategic marketing and negotiation skills. | Tag |
| 3 | Property Rentals | Secure reliable tenants or find the perfect rental property with our comprehensive management and screening services. | KeyRound |

**Layout:** 3-column grid on desktop, single column on mobile. Cards with centered icon, title, and description.

---

### 3.3 Investment Section

**Section heading (H2):** Explore Unique Investment Opportunities

| # | Title | Description | Icon |
|---|-------|-------------|------|
| 1 | Buyback Deals | Secure investments with guaranteed returns through our exclusive property buyback agreements. | TrendingUp |
| 2 | Pre-Lease Properties | Invest in commercial properties with tenants already secured, ensuring immediate rental income. | Building2 |
| 3 | Plotting | Acquire strategically located land parcels with high appreciation potential for future development. | Map |
| 4 | Weekend Villas | Own a luxurious getaway home perfect for relaxation or generating rental income. | Palmtree |
| 5 | Pre-Launch Projects | Gain early access to promising new developments at preferential rates before public launch. | Rocket |

**Layout:** Responsive grid — 1 col (mobile), 2 cols (md), 3 cols (lg).

---

### 3.4 CTA Section

| Element | Content |
|---------|---------|
| **Heading (H2)** | Ready to Find Your Perfect Property or Investment? |
| **Body** | Let Rajal Realty guide you through every step. Contact us today for a personalized consultation or explore our current listings. |
| **Button 1** | Contact Us Now → `/contact` |
| **Button 2** | View Properties → `/properties` |

**Visual note:** Full-width section with primary (deep blue) background and light text.

---

## 4. About Page (`/about`)

### Page Header

| Element | Content |
|---------|---------|
| **Title (H1)** | About Rajal Realty |
| **Subtitle** | Your Partner in Real Estate and Finance |

---

### Main Content — Welcome Card

| Element | Content |
|---------|---------|
| **Card title** | Welcome to Rajal Realty and Financial Services |
| **Card subtitle** | Your trusted partner in Ahmedabad for all your real estate and financial needs. |

**Paragraph 1:**

> Based in Ahmedabad, Rajal Realty specializes in helping you find your dream property, whether it's residential, commercial, or investment-focused. With deep roots in Ahmedabad's vibrant real estate market and strong relationships with local builders, we combine expertise, transparency, and commitment to deliver unmatched value and customer satisfaction.

**Paragraph 2:**

> On the financial services front, we offer tailored solutions in Ahmedabad to empower you with the resources and guidance needed to make sound financial decisions. From loans and investment planning to comprehensive advisory services, our team ensures your financial goals are met with ease and confidence.

---

### Two-Column Cards

#### Our Mission

> Our mission is simple: to build lasting relationships by providing professional, personalized, and reliable services that exceed your expectations.

#### Partner in Growth

> Let Rajal Realty and Financial Services be your partner in growth. Connect with us today to explore opportunities, make informed decisions, and secure your future!

**Icons:** Target (Mission), DollarSign (Partner in Growth), Users (Welcome card title)

---

## 5. Contact Page (`/contact`)

### Page Header

| Element | Content |
|---------|---------|
| **Title (H1)** | Contact Rajal Realty |
| **Subtitle** | We're here to help with all your real estate needs. |

---

### Layout

Two-column grid on desktop:

- **Left:** Contact form (card)
- **Right:** Direct contact details (card)

---

### 5.1 Contact Form

**Card title:** Send Us a Message  
**Card description:** Fill out the form below, and we'll get back to you shortly.

| Field | Label | Required | Validation | Placeholder |
|-------|-------|----------|------------|-------------|
| name | Full Name | Yes | Min 2 characters | John Doe |
| email | Email Address | Yes | Valid email | john.doe@example.com |
| phone | Phone Number (Optional) | No | — | +91 90999 04235 |
| subject | Subject | Yes | Min 5 characters | Inquiry about Property ID 123 |
| message | Your Message | Yes | Min 10, max 500 characters | Please provide details about your inquiry... |

**Submit button states:**

- Default: `Send Message`
- Loading: `Sending...`

**Success toast (current behavior — simulated):**

- **Title:** Message Sent (Simulated)
- **Description:** We've received your inquiry and will be in touch soon.

> Form submission is currently a placeholder (console log + 1.5s delay). Wire to a real backend/email service when rebuilding.

---

### 5.2 Direct Contact Details

**Card title:** Get in Touch Directly  
**Card description:** Reach out to us via phone, email, or visit our office.

| Type | Value |
|------|-------|
| **Email** | rajal.associate@gmail.com |
| **Phone 1** | +91 90999 04235 |
| **Phone 2** | +91 94296 86726 |
| **Address line 1** | Shivranjani Society, Shivranjani Cross Road |
| **Address line 2** | Satellite, Ahmedabad |

**Phone display format:** Both numbers shown as `+91 90999 04235 / +91 94296 86726`, each as a separate `tel:` link.

---

### 5.3 Optional / Not Implemented

- **Map embed** — commented out; placeholder text was: *"Map Placeholder (Integrate Google Maps or similar here)"*
- **Third address line** — reserved but empty

---

## 6. Footer (Shared)

| Element | Content |
|---------|---------|
| **Copyright** | © {current year} Rajal Realty. All rights reserved. |
| **Tagline** | Your Trusted Partner in Real Estate. |

> Social media links are noted as a future addition in code comments.

---

## 7. Page Layout Patterns

Use these patterns for visual consistency when rebuilding:

### Inner Page Header (About & Contact)

```
Background: primary color
Text: primary-foreground (light)
Padding: py-6
Title: text-3xl font-bold
Subtitle: text-primary-foreground/80
```

### Section Spacing

- Standard section padding: `py-16 lg:py-24`
- Container: `container mx-auto px-4`
- Cards: `shadow-lg`, hover effects on service/investment cards

### Home vs Inner Pages

| Page | Header style |
|------|--------------|
| Home | Hero with background image + gradient (no separate page header bar) |
| About, Contact | Colored header bar with H1 + subtitle |

---

## 8. All CTAs & Internal Links

| Source | Button / Link Text | Destination |
|--------|-------------------|-------------|
| Hero | Explore Properties & Investments | `/properties` |
| CTA Section | Contact Us Now | `/contact` |
| CTA Section | View Properties | `/properties` |
| Navbar | Home | `/` |
| Navbar | Properties | `/properties` |
| Navbar | About Us | `/about` |
| Navbar | Contact Us | `/contact` |
| Navbar logo | (image) | `/` |
| Contact email | rajal.associate@gmail.com | `mailto:rajal.associate@gmail.com` |
| Contact phone | +91 90999 04235 | `tel:+919099904235` |
| Contact phone | +91 94296 86726 | `tel:+919429686726` |

---

## 9. Content Checklist for Rebuild

Use this checklist to verify all copy is migrated:

- [ ] Site title & meta description
- [ ] Navbar — 4 links + logo
- [ ] Home — hero headline, subheadline, CTA
- [ ] Home — 3 service cards (title + description each)
- [ ] Home — 5 investment cards (title + description each)
- [ ] Home — CTA section (heading, body, 2 buttons)
- [ ] About — page header
- [ ] About — welcome card (title, subtitle, 2 paragraphs)
- [ ] About — mission card
- [ ] About — partner in growth card
- [ ] Contact — page header
- [ ] Contact — form (5 fields, labels, placeholders, validation messages)
- [ ] Contact — email, 2 phones, address
- [ ] Footer — copyright + tagline
- [ ] Brand colors applied (primary, secondary, accent)

---

## 10. Source File Reference

Content was extracted from:

| Page / Component | File |
|------------------|------|
| Home (orchestrator) | `src/app/page.tsx` |
| Hero | `src/components/hero-section.tsx` |
| Services | `src/components/services-section.tsx` |
| Investments | `src/components/investment-section.tsx` |
| CTA | `src/components/cta-section.tsx` |
| About | `src/app/about/page.tsx` |
| Contact | `src/app/contact/page.tsx` |
| Navbar | `src/components/navbar.tsx` |
| Footer | `src/components/footer.tsx` |
| Layout & metadata | `src/app/layout.tsx` |

---

## 11. Related Docs

- **`docs/blueprint.md`** — Original product brief, style guidelines, and landing page generation prompt (useful for design direction and feature scope beyond static content).
