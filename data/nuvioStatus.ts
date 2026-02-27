export const PRODUCT_STATUS = {
    status: "in_progress" as const,
    label: "In Progress",
    description: "Preview build. Features may change.",
    roadmapItems: [
        {
            id: "1",
            title: "Fleet Management",
            description: "Vehicle tracking and contract management",
            status: "In Development"
        },
        {
            id: "2",
            title: "Client Portal",
            description: "Customer invoicing and payment processing",
            status: "In Development"
        },
        {
            id: "3",
            title: "Staff Management",
            description: "Employee roles and access control",
            status: "Planned"
        },
        {
            id: "4",
            title: "Document System",
            description: "PDF generation and export capabilities",
            status: "Planned"
        },
        {
            id: "5",
            title: "Advanced Analytics",
            description: "Real-time reporting and insights",
            status: "Planned"
        },
        {
            id: "6",
            title: "Mobile App",
            description: "iOS and Android applications",
            status: "Research"
        }
    ]
}

export type ProductStatus = typeof PRODUCT_STATUS
