# Debbie's Magical Wreaths

Source backup for the Debbie's Magical Wreaths website, API, and companion mobile app.

## What is included

- **Website:** React 19, Vite, Tailwind CSS, Wouter, TanStack Query
- **API:** Node.js, TypeScript, Express 5
- **Database:** PostgreSQL with Drizzle ORM
- **Mobile app:** Expo SDK 54 and Expo Router
- **Package manager:** pnpm workspaces
- **Runtime:** Node.js 24

## Repository layout

```text
artifacts/
  magical-wreaths/   Public website and order form
  api-server/        Order, email, push, and admin API
  wreaths-mobile/    Expo mobile app
lib/
  db/                PostgreSQL connection and Drizzle schema
  api-spec/          OpenAPI specification
  api-client-react/  Generated React API client
  api-zod/           Generated Zod API schemas
attached_assets/     Production images used by the website
```

## Main features

- Responsive marketing site for custom wreaths, bows, and boutique products
- Multi-step custom order form
- Order notification and customer confirmation emails through Gmail
- PostgreSQL-backed order records
- Private `/admin` order dashboard with pending, confirmed, and complete statuses
- Expo mobile companion app

## Local setup

### Requirements

- Node.js 24
- pnpm 10
- PostgreSQL

Install dependencies:

```bash
pnpm install
```

### Environment variables

Configure these through your hosting provider or local environment. Do not commit their values.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `DEBBIE_EMAIL` | Address that receives new-order notifications |
| `ADMIN_PASSWORD` | Password for the private `/admin` dashboard |
| `SESSION_SECRET` | Server-side session/security secret |
| `PORT` | API or development-server port |
| `BASE_PATH` | Vite deployment base path, normally `/` |

Gmail delivery uses a Replit Gmail connector. On another host, reconnect Gmail or replace the connector calls in `artifacts/api-server/src/routes/orders.ts` with another email provider.

## Database setup

The schema source is:

```text
lib/db/src/schema/index.ts
```

After configuring `DATABASE_URL`, apply the schema:

```bash
pnpm --filter @workspace/db run push
```

This creates the order storage needed by the order form and admin dashboard.

## Run locally

Run each service in a separate terminal:

```bash
# API
PORT=5000 pnpm --filter @workspace/api-server run dev

# Website
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/magical-wreaths run dev

# Mobile app
pnpm --filter @workspace/wreaths-mobile run dev
```

## Build

```bash
pnpm --filter @workspace/api-server run build
BASE_PATH=/ pnpm --filter @workspace/magical-wreaths run build
```

The website build is written to:

```text
artifacts/magical-wreaths/dist/public
```

The API bundle is written to:

```text
artifacts/api-server/dist
```

## Replit deployment

The Replit project uses:

- A static web artifact served at `/`
- An autoscaled API artifact served at `/api`
- PostgreSQL supplied through Replit Database
- Gmail supplied through the Replit Gmail integration

For a fresh Replit copy:

1. Import this GitHub repository.
2. Provision a PostgreSQL database.
3. Add the required secret values.
4. Connect Gmail.
5. Run the database schema command above.
6. Start the website and API workflows.
7. Publish the web and API artifacts.

## Backup notes

This repository contains the complete runnable source and the images used by the website. Unused duplicate/raw photo uploads were intentionally omitted from the GitHub backup to keep it manageable. Database records and secret values are not stored in Git and must be backed up or reconfigured separately.