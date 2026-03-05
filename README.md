# H-Prime Appliance Repair Website

High-conversion website for appliance repair business in Denver, CO with dynamic landing pages for cities, appliances, and brands.

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form + Zod** for form validation
- **Google reCAPTCHA v3** for bot protection
- **n8n** for lead processing

## Features

- Dynamic pages for cities in Denver Metro area
- Dynamic pages for appliance types
- Dynamic pages for brands
- SEO-optimized with metadata and Schema.org
- Lead form with reCAPTCHA v3
- Google Reviews integration
- Sticky mobile bar (Call + Book buttons)
- Fully responsive design
- Automatic sitemap generation

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` file:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
N8N_WEBHOOK_URL=https://webhook-processor-production-ae2b.up.railway.app
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
h-prime-site/
├── app/
│   ├── services/[appliance]/     # /services/refrigerator
│   ├── brands/[brand]/           # /brands/lg
│   ├── cities/[city]/            # /cities/aurora
│   ├── blog/[slug]/              # Blog posts
│   ├── api/
│   │   └── submit-lead/          # API route for lead submission
│   ├── layout.tsx
│   ├── page.tsx                  # Homepage
│   └── sitemap.ts                # Dynamic sitemap
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── GoogleRating.tsx
│   ├── Reviews.tsx
│   ├── LeadForm.tsx
│   ├── StickyMobileBar.tsx
│   └── ReCaptchaProvider.tsx
├── content/
│   ├── appliances/               # YAML content for appliance pages
│   ├── brands/                   # YAML content for brand pages
│   └── cities/                   # YAML content for city pages
├── lib/
│   └── data/
│       ├── cities.ts
│       ├── appliances.ts
│       ├── brands.ts
│       └── reviews.ts
└── package.json
```

## Deployment to Vercel

### 1. Connect to Vercel

```bash
npm install -g vercel
vercel login
vercel
```

### 2. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`
- `N8N_WEBHOOK_URL`

### 3. Deploy

```bash
vercel --prod
```

## Contact Information

- **Phone**: (720) 784-6766
- **Service Area**: Denver Metro, Colorado
- **Website**: h-primeappliance.com

## License

© 2026 H-Prime Appliance Repair. All rights reserved.
