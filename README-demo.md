# NuVio SaaS Demo

## Platform Overview
NuVio is a reference-class modular B2B operating system simulation. It demonstrates the technical feasibility and user experience of a "Hub-and-Spoke" architecture where a unified core powers multiple specialized business modules.

### Core Capabilities (The Hub)
- **Multi-Tenant Simulation**: Seamlessly switch between distinct organizational contexts (Acme, GlobalTech, StartupX, Fleet).
- **Role-Based Access Control (RBAC)**: Simulated guards for Admin, Editor, and Viewer roles.
- **Unified Branding**: A consistent, premium design system inspired by modern enterprise standards.

### Specialized Modules (The Spokes)
- **NuVio Fleet**: Heavy-duty asset and logistics management.
- **NuVio Clients**: Customer relationship and invoicing workflows.
- **NuVio Edge**: Automated compute and background job orchestration.
- **NuVio Docs**: Centralized document generation and exports.

## How to Explore the Demo

### 1. Guided Experience
Upon login, we recommend starting with the **Narrated Demo Mode**. This guided tour explains the architecture, the demo's intent, and highlights key technical features.

### 2. Tenant & Role Deep Dive
Use the **Login Simulator** to enter as different users. Notice how:
- The dashboard stats and available modules change per tenant.
- Write actions (Create/Edit) are disabled for "Viewer" roles but enabled for "Admin".

### 3. Data Transparency
Visit the **Settings** page to explore:
- **Architecture Overview**: Concise technical context.
- **Interactive Scenarios**: Simulated edge cases (Permission errors, Import failures).
- **Data Tools**: JSON-based export/import of tenant datasets (Locked by default; use `NUVIO-ADMIN` to unlock).

## Technical Implementation Details
- **Framework**: Built with Next.js (App Router) and TailwindCSS.
- **State Management**: Zero-refresh session handling via `localStorage`.
- **Modularity**: Every module is built as a self-contained component layer.
- **Performance**: Optimized for zero-flicker client-side guarding and deterministic hydration.

## Intentional Limitations
- **No Backend**: All data is simulated in-memory and persisted via local storage.
- **Write Safety**: Create/Edit/Delete actions trigger feedback UI but do not mutate global state to ensure demo stability.
- **Static Assets**: Charts and distribution maps use deterministic mock data streams.

---
*Created as part of Axel's 2026 Digital Products & Systems Portfolio.*
