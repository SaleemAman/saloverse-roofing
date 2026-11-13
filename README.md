# Saloverse Roofing Services — Whop Website Template

**Live Demo:** [https://saloverse-roofing-app.whop.site/](https://saloverse-roofing-app.whop.site/)

A modern, conversion-focused roofing services website template engineered for **Whop Websites** and deployed on **Cloudflare Workers**. This template combines a service showcase and lead-generation workflow with embedded Whop checkout elements for seamless deposit collection.

---

## 🏗️ Implementation Steps & Architecture

### 1. Responsive Two-Column UI & Custom Light Theme
- Designed a two-column split layout (`App.css`) optimized for local home-service businesses.
- Built a custom light theme with clear visual hierarchy, pairing service cards and an interactive estimate request form on the left with a sticky payment terminal on the right.

### 2. Whop Elements SDK Integration
- Integrated `@whop/elements` and `@whop/elements-react` using separated `<Checkout>` and `<Payments>` provider wrappers to prevent slot conflicts.
- Configured **`ExpressCheckoutElement`** for fast one-click payments, **`CheckoutElement`** for standard card processing, and **`BrandingElement`** for security badges.

### 3. Client-Side Lead Capture & Event Telemetry
- Implemented a state-managed estimate form capturing customer name, contact info, service type, and project notes.
- Wired form submission directly to Whop's tracking SDK via `window.whop.track('estimate_requested')` to log lead events without external backend dependencies.

### 4. Cloudflare Workers & Whop Hosting Pipeline
- Configured `@cloudflare/vite-plugin` and `@whop/cli/vite` inside `vite.config.ts` to emit both static client assets (`dist/client`) and SSR worker modules (`dist/server`).
- Added a lightweight Cloudflare Worker entry (`server.ts`) and `wrangler.jsonc` asset binding to serve static files with an SPA fallback.

---

## 🛠️ Tech Stack

- **Framework:** React, TypeScript, Vite
- **Checkout & Telemetry:** `@whop/elements`, `@whop/elements-react`
- **Edge Runtime & Deployment:** Cloudflare Workers, Wrangler, `@cloudflare/vite-plugin`, `@whop/cli`
- **Styling:** Custom CSS3 Grid & Flexbox (`App.css`)

---

## 📂 Project Structure

```text
├── src/
│   ├── App.tsx          # Two-column layout, lead form logic, & Whop SDK wrappers
│   ├── App.css          # Custom light-theme stylesheet
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── server.ts            # Cloudflare Worker script for static asset routing
├── vite.config.ts       # Vite build & plugin configuration
├── wrangler.jsonc       # Cloudflare Worker & asset binding config
└── package.json         # Project dependencies and scripts
