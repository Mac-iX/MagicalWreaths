# Debbie's Magical Wreaths

Source for the MagicalWreaths.com website — Debbie Gentry's handcrafted wreaths
and bows, served as a static site on Vercel with a Google Sheets order flow.

## What is included

- **Website:** React 19, Vite, Tailwind CSS, Wouter — built as a static site and deployed on Vercel
- **Order flow:** Google Apps Script webhook → Google Sheet ("Magical Wreaths Orders") + Gmail notifications to Debbie and the customer
- **Package manager:** pnpm workspaces

The repo also carries `api-server`, `wreaths-mobile`, and `lib/` packages from the
pre-migration stack (Express API + PostgreSQL + Expo app). They are kept for
reference only and are **not** built or deployed — the deployed site is the
static web app alone.

## Repository layout

```text
artifacts/
  magical-wreaths/   Public website and order form (the deployed app)
  api-server/        Legacy order/email API (not deployed)
  wreaths-mobile/    Expo mobile app (not deployed)
lib/                 Legacy shared packages (not deployed)
attached_assets/     Production images used by the website
```

## Main features

- Responsive marketing site for custom wreaths, bows, and boutique products
- Multi-step custom order form
- Orders land in the Google Sheet and email Debbie plus the customer
- `/gallery` page and homepage sections read from one data file
- Market event times/locations editable from the same data file

## Local setup

### Requirements

- Node.js 24
- pnpm

Install dependencies:

```bash
pnpm install
```

### Environment variables

Configure these through your hosting provider or local environment. Do not commit their values.

| Variable | Purpose |
| --- | --- |
| `VITE_GOOGLE_SHEETS_URL` | Google Apps Script web app URL the order form POSTs to (set in Vercel) |

## Build

```bash
BASE_PATH=/ pnpm --filter @workspace/magical-wreaths run build
```

The website build is written to:

```text
artifacts/magical-wreaths/dist/public
```

## How to update the site (photos, galleries, market events)

The site is a static build on Vercel. ALL content lives in one file:

```
artifacts/magical-wreaths/src/data/site.ts
```

### Add a new wreath / bow / photo

1. Drop the image file into the `attached_assets/` folder at the repo root.
2. Open `artifacts/magical-wreaths/src/data/images.ts` and add an import line for it,
   e.g. `import myWreath from "@assets/my-wreath.jpg";` then add it to the export list.
3. Open `artifacts/magical-wreaths/src/data/site.ts` and add one entry to the
   `collections` or `bows` array (title, desc, style, image, cover).
4. Commit and push to `main` — Vercel rebuilds and the site updates automatically
   (usually 1–2 minutes).

The `/gallery` page and the homepage sections all read from the same file, so one
edit updates both.

### Update market events (times / locations)

In `artifacts/magical-wreaths/src/data/site.ts`, edit the `events` array:

```ts
export const events: MarketEvent[] = [
  { title: "Oak Island Farmers Market", date: "Saturday, October 3", time: "9:00 AM – 1:00 PM", location: "Oak Island Town Park", note: "Booth #12" },
];
```

Empty array = the homepage shows only the general "Find Debbie at the Market" text.

### Orders (form submissions)

Orders land in the Google Sheet **"Magical Wreaths Orders"** (tab: Orders) and email
Debbie at gentrydebbie13@gmail.com plus the customer. The sheet has a **Status**
column — change a row to "In Progress" or "Complete" as you work it.

The form sends to the URL in the Vercel environment variable `VITE_GOOGLE_SHEETS_URL`
(the Google Apps Script web app URL). The script source is
`artifacts/magical-wreaths/google-apps-script.js` (re-deploy it from
script.google.com if the script ever changes).
