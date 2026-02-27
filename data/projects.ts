export interface Project {
    id: string
    title: string
    description: string
    category: "Web" | "Mobile" | "Design" | "Strategy"
    image: string
    previewImage: string
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
        id: "wt-erdbewegungen",
        title: "WT Erdbewegungen",
        description: "Professional website for a local excavation and earthmoving company — fast, responsive, and built for search visibility.",
        category: "Web",
        image: "/wterd.webp",
        previewImage: "/wterd.webp",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
        link: "https://www.wt-erdbewegungen.de",
        featured: true,
        caseStudy: {
            problem: "A local construction and earthmoving business had no web presence at all. Potential customers in the region couldn't find them online, and all leads came through word-of-mouth only.",
            solution: "Designed and built a clean, fast-loading website focused on showcasing the company's services, machinery, and completed projects. Implemented strong on-page SEO for local search terms and ensured the site performs well on mobile devices, where most local searches happen.",
            result: "The business now has a professional online presence that ranks for relevant local search terms. The site loads in under 2 seconds on mobile and gives potential customers a clear picture of the services offered."
        }
    },
    {
        id: "daisymays-salon",
        title: "Daisy May's Salon",
        description: "Bilingual website for a dog grooming salon — warm branding, booking information, and multi-language support.",
        category: "Web",
        image: "/daisymays.webp",
        previewImage: "/daisymays.webp",
        tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "i18n"],
        link: "https://www.daisymayssalon.de",
        featured: true,
        caseStudy: {
            problem: "A dog grooming salon needed a website that could serve both German and English-speaking customers. The existing workflow relied entirely on phone calls and social media, making it hard to communicate services and prices clearly.",
            solution: "Built a fully responsive, bilingual website with internationalization (i18n) support. Focused on warm, approachable design that matches the salon's brand. Included clear service descriptions, pricing, image galleries, and easy-to-find contact information.",
            result: "The salon now has a professional bilingual website that reduces repetitive phone inquiries about services and prices. Customers can browse offerings in their preferred language and find all the information they need to book an appointment."
        }
    }
]
