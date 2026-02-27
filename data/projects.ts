export interface Project {
    id: string
    title: string
    description: string
    category: "Web" | "Mobile" | "Design" | "Strategy"
    image: string
    tags: string[]
    link: string
    featured: boolean
    demoRoute?: string
    caseStudy?: {
        problem: string
        solution: string
        result: string
    }
}

export const projects: Project[] = [
    {
        id: "vanguard",
        title: "Vanguard",
        description: "Institutional trading dashboard consolidating fragmented workflows into a unified, real-time interface.",
        category: "Web", // Using existing union type
        image: "/placeholder-project-1.jpg",
        tags: ["Next.js", "TypeScript", "WebSocket", "TanStack Query"],
        link: "#", // No detail page exists yet
        featured: true,
        demoRoute: "/demos/vanguard",
        caseStudy: {
            problem: "Traders were switching between six different legacy applications to execute a single transaction, leading to data entry errors and missed market opportunities. The existing tools were strictly tabular and lacked contextual visualization.",
            solution: "Designed and built a unified web-based dashboard that aggregates market data, execution, and risk analysis. Implemented a highly performant WebSocket layer for real-time price updates and a composable widget system allowing traders to customize their workspace.",
            result: "Reduced average trade execution time by 30% and completely eliminated cross-application copy-paste errors. Adopted by the institutional desk as the primary daily driver within two months."
        }
    },
    {
        id: "helix",
        title: "Helix",
        description: "Multi-brand design system for a rapid-growth healthtech scale-up.",
        category: "Design",
        image: "/placeholder-project-2.jpg",
        tags: ["React", "Storybook", "Tailwind", "Figma API"],
        link: "#",
        featured: true,
        demoRoute: "/demos/helix",
        caseStudy: {
            problem: "After acquiring two smaller competitors, the product landscape was fractured. Five different authentication flows and inconsistent UI patterns were slowing down feature development and confusing users moving between products.",
            solution: "Established a core design system with strict reliable tokens and a library of 40+ accessible React components. Built automated pipelines to sync Figma tokens directly to the codebase, ensuring design-dev parity.",
            result: "Reduced UI related code debt by 40% and accelerated the prototyping phase by 2x. Successfully unified the visual identity across all three major product lines within one year."
        }
    },
    {
        id: "velos",
        title: "Velos",
        description: "High-performance headless e-commerce platform for a global lifestyle brand.",
        category: "Web",
        image: "/placeholder-project-3.jpg",
        tags: ["Next.js", "Shopify Headless", "Framer Motion", "Edge Functions"],
        link: "#",
        featured: true,
        demoRoute: "/demos/velos",
        caseStudy: {
            problem: "The previous monolithic shop setup crashed during peak traffic events (Black Friday) and suffered from slow mobile load times, resulting in a high cart abandonment rate on mobile devices.",
            solution: "Re-platformed to a modern headless architecture using Next.js on the edge. Implemented aggressive caching strategies and optimistic UI updates to ensure the interface feels instant, even on slow connections.",
            result: "Achieved 99.99% uptime during the biggest sale of the year. Mobile conversion rate increased by 15% due to sub-second page transitions and improved perceived performance."
        }
    },
    {
        id: "nuvio-core",
        title: "NuVio Core",
        description: "Unified platform powering 7 specialized products for fleet management, from vehicles to automation.",
        category: "Strategy",
        image: "/placeholder-project-4.jpg",
        tags: ["Platform Design", "Product Ecosystem", "Multi-Tenancy", "SaaS"],
        link: "#",
        featured: true,
        demoRoute: "/demos/nuvio-core",
        caseStudy: {
            problem: "Building a fleet management SaaS required multiple specialized products (vehicles, clients, staff, documents, scheduling). Each product needed shared authentication, billing, and tenant management, but building these foundations separately would create fragmentation and technical debt.",
            solution: "Designed NuVio Core as the foundational platform providing Auth, Roles, Tenants, Billing, and Feature Flags. Built 7 specialized products (Fleet, Clients, Staff, Docs, Plan, Edge, Lab) that all run on this shared foundation. Each product can be activated per tenant, enabling flexible pricing and deployment.",
            result: "Launched a scalable product ecosystem where new products can be added without rebuilding core infrastructure. Reduced development time for new modules by 60%. Enabled flexible per-tenant product activation, increasing revenue opportunities through modular pricing."
        }
    }
]
