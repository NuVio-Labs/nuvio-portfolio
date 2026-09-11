# Future Architecture: Authentication & E-Commerce Integration

This document outlines the strategy for upgrading the current portfolio site to include full authentication and e-commerce capabilities.

## 1. Authentication (Clerk or NextAuth.js)

The current in-memory auth stub should be replaced with a robust solution. **Clerk** is recommended for its ease of use and drop-in components, while **NextAuth.js (Auth.js)** offers more control and owns the data.

### Clerk Integration Strategy
1.  **Install Clerk**: `npm install @clerk/nextjs`
2.  **Environment Variables**: configured in `.env.local`
3.  **Middleware**: Add `middleware.ts` to protect routes under `/app` and `/orders`
4.  **Replace Stub**:
    - Remove `AuthProvider` context.
    - Wrap `RootLayout` with `<ClerkProvider>`.
    - Replace Login page with Clerk's generic `<SignIn />` or custom flow using useSignIn.
5.  **User Data**: Sync Clerk users to database via Webhooks (listen for `user.created`).

## 2. E-Commerce (Stripe)

For selling digital assets or services, Stripe Integrations (Checkout or Elements) is the standard.

### Stripe Integration Strategy
1.  **Product Management**:
    - Use a headless CMS (Sanity, Contentful) or a database (Supabase/Postgres) to store product details (Price ID, Name, Description).
    - Current `/data` folder can be migrated to the DB.
2.  **Checkout Flow**:
    - **Cart**: Implement a global Cart context (Zustand or Recoil).
    - **API Route**: Create `/api/checkout_sessions` to handle Stripe Session creation.
    - **Frontend**: "Buy Now" button calls the API and redirects to Stripe Checkout.
3.  **Webhooks**:
    - Create `/api/webhooks/stripe` to listen for `checkout.session.completed`.
    - On success, provision the access (e.g., send email, unlock dashboard content).

## 3. Database (Supabase / PostgreSQL)

A persistent database is needed for:
- User profiles (extends Auth user)
- Order history
- Product inventory/content

### Schema Proposal (Prisma)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
  orders    Order[]
}

model Product {
  id          String   @id @default(cuid())
  stripeId    String   @unique
  name        String
  description String
  price       Int
}

model Order {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  total     Int
  status    String   // PENDING, COMPLETED
  createdAt DateTime @default(now())
}
```

## 4. Next Steps

1.  Set up Supabase project.
2.  Configure Prisma with the schema above.
3.  Implement Clerk for Auth.
4.  Implement Stripe Checkout for a test product.
