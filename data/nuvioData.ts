export interface Vehicle {
    id: string;
    make: string;
    model: string;
    plate: string;
    status: "available" | "active" | "maintenance";
}

export interface Contract {
    id: string;
    title: string;
    status: "active" | "pending" | "signed";
}

export interface Customer {
    id: string;
    name: string;
    email: string;
}

export interface Invoice {
    id: string;
    amount: number;
    status: "paid" | "pending" | "overdue";
    date: string;
}

export interface Module {
    id: string;
    name: string;
    path: string;
    category: "operations" | "platform" | "lab";
    description: string;
    demoData: (tenantId: string) => {
        headers: string[];
        rows: any[];
        fields: { label: string; name: string; type: string; placeholder: string; value: string }[];
    };
}

export const MODULES: Module[] = [
    {
        id: "fleet",
        name: "Fleet",
        path: "/dashboard/fleet",
        category: "operations",
        description: "Asset and logistics management",
        demoData: (tid) => ({
            headers: ["Plate", "Model", "Status", "Last Service"],
            rows: tid === 'fleet' ? [
                { plate: "FL-101", model: "Mercedes Sprinter", status: "Active", service: "2026-01-05" },
                { plate: "FL-102", model: "Ford Transit", status: "Active", service: "2026-01-10" },
                { plate: "FL-103", model: "VW Crafter", status: "Maintenance", service: "2025-12-20" },
            ] : [
                { plate: "AC-001", model: "Tesla Model 3", status: "Active", service: "2026-02-01" },
                { plate: "AC-002", model: "BMW i4", status: "Available", service: "2026-01-15" },
            ],
            fields: [
                { label: "Vehicle Plate", name: "plate", type: "text", placeholder: "ABC-123", value: tid === 'fleet' ? "FL-101" : "AC-001" },
                { label: "Vehicle Model", name: "model", type: "text", placeholder: "Vans / EV", value: tid === 'fleet' ? "Mercedes Sprinter" : "Tesla Model 3" },
                { label: "Odometer (km)", name: "km", type: "number", placeholder: "0", value: "12450" }
            ]
        })
    },
    {
        id: "clients",
        name: "Clients",
        path: "/dashboard/clients",
        category: "operations",
        description: "CRM and invoicing workflows",
        demoData: (tid) => ({
            headers: ["Client Name", "Active Contracts", "Total Revenue", "Status"],
            rows: [
                { name: "Urban Delivery Corp", contracts: 3, revenue: "$45,000", status: "Active" },
                { name: "Global Logistics", contracts: 1, revenue: "$125,000", status: "Active" },
                { name: "Swift Freight", contracts: 0, revenue: "$0", status: "Pending" },
            ],
            fields: [
                { label: "Contact Person", name: "contact", type: "text", placeholder: "Jane Doe", value: "Michael Swift" },
                { label: "Billing Email", name: "email", type: "email", placeholder: "billing@company.com", value: "logistics@urban.com" },
                { label: "Credit Limit", name: "limit", type: "number", placeholder: "5000", value: "50000" }
            ]
        })
    },
    {
        id: "staff",
        name: "Staff",
        path: "/dashboard/staff",
        category: "operations",
        description: "Workforce and payroll simulation",
        demoData: (tid) => ({
            headers: ["Name", "Role", "Department", "Performance"],
            rows: [
                { name: "Sarah Miller", role: "Fleet Op Manager", dept: "Logistics", perf: "98%" },
                { name: "David Chen", role: "Sr Dispatcher", dept: "Ops", perf: "92%" },
                { name: "Alex Rivers", role: "Compliance Officer", dept: "Legal", perf: "95%" },
            ],
            fields: [
                { label: "Full Name", name: "name", type: "text", placeholder: "John Smith", value: "Sarah Miller" },
                { label: "Annual Salary", name: "salary", type: "number", placeholder: "0", value: "85000" },
                { label: "Onboarding State", name: "state", type: "select", placeholder: "Select state", value: "Verified" }
            ]
        })
    },
    {
        id: "docs",
        name: "Docs",
        path: "/dashboard/docs",
        category: "platform",
        description: "Automated document generation",
        demoData: (tid) => ({
            headers: ["Filename", "Type", "Generated", "Status"],
            rows: [
                { name: "invoice_2026_01.pdf", type: "Invoice", date: "2026-02-01", status: "Signed" },
                { name: "contract_v4_final.docx", type: "Contract", date: "2026-02-05", status: "Pending" },
                { name: "compliance_report.pdf", type: "Report", date: "2026-02-07", status: "Final" },
            ],
            fields: [
                { label: "Document Name", name: "doc_name", type: "text", placeholder: "Report...", value: "invoice_2026_01.pdf" },
                { label: "Retention Policy", name: "policy", type: "select", placeholder: "Select...", value: "7 Years (Standard)" },
                { label: "Encrypted", name: "encrypt", type: "checkbox", placeholder: "", value: "true" }
            ]
        })
    },
    {
        id: "plan",
        name: "Plan",
        path: "/dashboard/plan",
        category: "platform",
        description: "Enterprise resource planning",
        demoData: (tid) => ({
            headers: ["Strategy", "Status", "Priority", "Impact"],
            rows: [
                { strategy: "EV Fleet Transition", status: "Active", priority: "High", impact: "High" },
                { strategy: "Q3 Expansion - Asia", status: "Planning", priority: "Med", impact: "High" },
                { strategy: "Carbon Neutral 2030", status: "Research", priority: "Low", impact: "Crtcl" },
            ],
            fields: [
                { label: "Project Title", name: "title", type: "text", placeholder: "Title", value: "EV Fleet Transition" },
                { label: "Budget Estimated", name: "budget", type: "number", placeholder: "0", value: "2500000" },
                { label: "Target Quarter", name: "tq", type: "text", placeholder: "Q1", value: "Q3 2026" }
            ]
        })
    },
    {
        id: "edge",
        name: "Edge",
        path: "/dashboard/edge",
        category: "lab",
        description: "Compute and background jobs",
        demoData: (tid) => ({
            headers: ["Job ID", "Worker Node", "CPU Usage", "Status"],
            rows: [
                { id: "J-0081", node: "lon-ed-01", cpu: "12%", status: "Idle" },
                { id: "J-0082", node: "nyc-ed-04", cpu: "88%", status: "Computing" },
                { id: "J-0083", node: "sin-ed-02", cpu: "45%", status: "Queued" },
            ],
            fields: [
                { label: "Worker ID", name: "worker", type: "text", placeholder: "edge-...", value: "lon-ed-01" },
                { label: "Concurrency Limit", name: "conc", type: "number", placeholder: "1", value: "64" },
                { label: "Logging Verbosity", name: "log", type: "select", placeholder: "...", value: "Debug" }
            ]
        })
    },
    {
        id: "lab",
        name: "Lab",
        path: "/dashboard/lab",
        category: "lab",
        description: "Experimental features and RnD",
        demoData: (tid) => ({
            headers: ["Experiment", "Version", "Alpha Group", "Stability"],
            rows: [
                { exp: "Neural Routing", ver: "0.2.1-a", group: "Tier 1", stability: "Low" },
                { exp: "Quantum Ledger", ver: "0.0.5-b", group: "Internal", stability: "None" },
                { exp: "Auto-Pilot v2", ver: "0.9.0-rc", group: "Tier 3", stability: "Med" },
            ],
            fields: [
                { label: "Feature Flag ID", name: "ffid", type: "text", placeholder: "FF_...", value: "neural_routing_enabled" },
                { label: "Rollout Percentage", name: "roll", type: "number", placeholder: "0", value: "15" },
                { label: "Kill Switch Enabled", name: "kill", type: "checkbox", placeholder: "", value: "true" }
            ]
        })
    },
    {
        id: "settings",
        name: "Settings",
        path: "/dashboard/settings",
        category: "platform",
        description: "System configuration and data tools",
        demoData: (tid) => ({
            headers: ["System Key", "Value", "Overridden", "Last Sync"],
            rows: [
                { key: "tenant_id", value: tid, override: "No", sync: "Now" },
                { key: "data_residency", value: "eu-central-1", override: "Yes", sync: "10m ago" },
                { key: "auth_provider", value: "internal-mock", override: "No", sync: "1h ago" },
            ],
            fields: [
                { label: "System Alias", name: "alias", type: "text", placeholder: "Alias", value: `${tid.toUpperCase()}_ENV` },
                { label: "Maintenance Mode", name: "maint", type: "checkbox", placeholder: "", value: "false" },
                { label: "Session Timeout (ms)", name: "tm", type: "number", placeholder: "3600000", value: "86400000" }
            ]
        })
    }
];

export interface TenantData {
    vehicles: Vehicle[];
    contracts: Contract[];
    customers: Customer[];
    invoices: Invoice[];
    enabledModules: string[];
}

export const SEED_DATA: Record<string, TenantData> = {
    acme: {
        vehicles: [
            { id: "v1", make: "Tesla", model: "Model 3", plate: "AC-001", status: "active" },
            { id: "v2", make: "BMW", model: "i4", plate: "AC-002", status: "available" }
        ],
        contracts: [
            { id: "c1", title: "Standard Service Agreement", status: "active" }
        ],
        customers: [
            { id: "cust1", name: "John Doe", email: "john@example.com" }
        ],
        invoices: [
            { id: "inv1", amount: 1500, status: "paid", date: "2026-01-15" }
        ],
        enabledModules: ["fleet", "clients", "docs", "settings"]
    },
    globaltech: {
        vehicles: [],
        contracts: [],
        customers: [],
        invoices: [],
        enabledModules: ["clients", "staff", "docs", "settings"]
    },
    startupx: {
        vehicles: [],
        contracts: [],
        customers: [],
        invoices: [],
        enabledModules: ["fleet", "edge", "lab", "settings"]
    },
    fleet: {
        vehicles: [
            { id: "fv1", make: "Mercedes", model: "Sprinter", plate: "FL-101", status: "active" },
            { id: "fv2", make: "Ford", model: "Transit", plate: "FL-102", status: "active" },
            { id: "fv3", make: "VW", model: "Crafter", plate: "FL-103", status: "maintenance" },
            { id: "fv4", make: "Iveco", model: "Daily", plate: "FL-104", status: "available" },
            { id: "fv5", make: "Renault", model: "Master", plate: "FL-105", status: "active" }
        ],
        contracts: [
            { id: "fc1", title: "Global Logistics Master Agreement", status: "active" },
            { id: "fc2", title: "Vendor Supply Contract", status: "signed" },
            { id: "fc3", title: "Maintenance Service Level Agreement", status: "active" }
        ],
        customers: [
            { id: "fcust1", name: "Global Trans Corp", email: "logistics@globaltrans.com" },
            { id: "fcust2", name: "Urban Delivery Services", email: "info@urbandeliv.com" },
            { id: "fcust3", name: "Swift Freight", email: "contact@swiftfreight.com" }
        ],
        invoices: [
            { id: "finv1", amount: 12500, status: "paid", date: "2026-02-01" },
            { id: "finv2", amount: 8400, status: "pending", date: "2026-02-05" },
            { id: "finv3", amount: 15200, status: "paid", date: "2026-02-07" }
        ],
        enabledModules: ["fleet", "clients", "staff", "docs", "plan", "edge", "lab", "settings"]
    }
};
