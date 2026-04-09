import type { Product, Service } from "@/types";

// --- Navigation ---
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/cart", label: "Cart" },
] as const;

export const ADMIN_NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/analytics", label: "Analytics" },
] as const;

// --- Mock Products ---
export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Quantum UI Kit",
    slug: "quantum-ui-kit",
    description:
      "A premium React component library with 200+ meticulously crafted components. Built with TypeScript, Tailwind CSS, and Framer Motion. Includes dark mode, responsive design, and accessibility features out of the box. Perfect for building modern SaaS dashboards and web applications.",
    shortDescription:
      "200+ premium React components with TypeScript & Tailwind CSS",
    price: 149,
    category: "components",
    imageUrl: "/products/quantum-ui.svg",
    features: [
      "200+ Components",
      "TypeScript",
      "Dark Mode",
      "Responsive",
      "Accessible",
      "Framer Motion",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    downloadUrl: "/downloads/quantum-ui-kit-v2.zip",
    version: "2.4.1",
    rating: 4.9,
    reviewCount: 342,
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2026-03-20T00:00:00Z",
    status: "active",
  },
  {
    id: "prod-002",
    name: "NeoAuth SDK",
    slug: "neoauth-sdk",
    description:
      "Enterprise-grade authentication SDK supporting OAuth 2.0, SAML, passkeys, and multi-factor authentication. Drop-in integration with Next.js, Express, and FastAPI. Includes session management, rate limiting, and audit logging.",
    shortDescription:
      "Enterprise auth SDK with OAuth, SAML, passkeys & MFA",
    price: 299,
    category: "plugins",
    imageUrl: "/products/neoauth.svg",
    features: [
      "OAuth 2.0",
      "SAML",
      "Passkeys",
      "MFA",
      "Session Management",
      "Audit Logs",
    ],
    techStack: ["Node.js", "TypeScript", "Redis", "PostgreSQL"],
    downloadUrl: "/downloads/neoauth-sdk-v3.zip",
    version: "3.1.0",
    rating: 4.8,
    reviewCount: 189,
    createdAt: "2025-03-10T00:00:00Z",
    updatedAt: "2026-02-15T00:00:00Z",
    status: "active",
  },
  {
    id: "prod-003",
    name: "DataForge CLI",
    slug: "dataforge-cli",
    description:
      "A powerful command-line tool for database migrations, seeding, and management. Supports PostgreSQL, MySQL, SQLite, and MongoDB. Features rollback protection, migration history, and team collaboration workflows.",
    shortDescription:
      "CLI tool for database migrations, seeding & management",
    price: 79,
    category: "tools",
    imageUrl: "/products/dataforge.svg",
    features: [
      "Multi-DB Support",
      "Migrations",
      "Seeding",
      "Rollback",
      "Team Collab",
      "CI/CD Ready",
    ],
    techStack: ["Go", "PostgreSQL", "MySQL", "SQLite", "MongoDB"],
    downloadUrl: "/downloads/dataforge-cli-v1.zip",
    version: "1.8.2",
    rating: 4.7,
    reviewCount: 256,
    createdAt: "2025-06-01T00:00:00Z",
    updatedAt: "2026-01-10T00:00:00Z",
    status: "active",
  },
  {
    id: "prod-004",
    name: "Apex Dashboard Template",
    slug: "apex-dashboard-template",
    description:
      "A production-ready admin dashboard template built with Next.js 14 and React Server Components. Includes real-time charts, data tables, user management, and analytics modules. Fully responsive with a stunning glassmorphism design.",
    shortDescription:
      "Production-ready Next.js admin dashboard with RSC",
    price: 199,
    category: "templates",
    imageUrl: "/products/apex-dashboard.svg",
    features: [
      "Next.js 14",
      "RSC",
      "Real-time Charts",
      "Data Tables",
      "User Management",
      "Glassmorphism",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Recharts", "Tailwind CSS"],
    downloadUrl: "/downloads/apex-dashboard-v2.zip",
    version: "2.0.0",
    rating: 4.9,
    reviewCount: 412,
    createdAt: "2025-02-20T00:00:00Z",
    updatedAt: "2026-04-01T00:00:00Z",
    status: "active",
  },
  {
    id: "prod-005",
    name: "CloudSync API Gateway",
    slug: "cloudsync-api-gateway",
    description:
      "A self-hosted API gateway with intelligent routing, rate limiting, caching, and real-time monitoring. Built for microservice architectures with built-in service discovery and load balancing.",
    shortDescription:
      "Self-hosted API gateway with routing, caching & monitoring",
    price: 399,
    category: "apis",
    imageUrl: "/products/cloudsync.svg",
    features: [
      "Smart Routing",
      "Rate Limiting",
      "Caching",
      "Monitoring",
      "Service Discovery",
      "Load Balancing",
    ],
    techStack: ["Rust", "Redis", "Prometheus", "Grafana"],
    downloadUrl: "/downloads/cloudsync-gateway-v1.zip",
    version: "1.2.0",
    rating: 4.6,
    reviewCount: 98,
    createdAt: "2025-09-05T00:00:00Z",
    updatedAt: "2026-03-15T00:00:00Z",
    status: "active",
  },
  {
    id: "prod-006",
    name: "ScriptForge Automation Kit",
    slug: "scriptforge-automation-kit",
    description:
      "A collection of 50+ production-ready automation scripts for DevOps, CI/CD, and infrastructure management. Includes Terraform modules, GitHub Actions workflows, Docker configurations, and monitoring setups.",
    shortDescription:
      "50+ DevOps automation scripts, Terraform modules & CI/CD",
    price: 129,
    category: "scripts",
    imageUrl: "/products/scriptforge.svg",
    features: [
      "50+ Scripts",
      "Terraform",
      "GitHub Actions",
      "Docker",
      "Monitoring",
      "Documentation",
    ],
    techStack: ["Bash", "Python", "Terraform", "Docker", "GitHub Actions"],
    downloadUrl: "/downloads/scriptforge-kit-v2.zip",
    version: "2.3.0",
    rating: 4.8,
    reviewCount: 167,
    createdAt: "2025-04-12T00:00:00Z",
    updatedAt: "2026-02-28T00:00:00Z",
    status: "active",
  },
];

// --- Mock Services ---
export const SERVICES: Service[] = [
  {
    id: "svc-001",
    name: "Full-Stack Web Application",
    slug: "full-stack-web-application",
    description:
      "End-to-end development of a modern web application tailored to your specifications. From architecture design to deployment, we handle every layer of the stack.",
    shortDescription: "Custom full-stack web app development",
    basePrice: 5000,
    category: "web-development",
    imageUrl: "/services/web-dev.svg",
    features: [
      "Custom Architecture",
      "Responsive UI",
      "API Development",
      "Database Design",
      "Deployment",
      "3 Months Support",
    ],
    deliveryTimeDays: 45,
    status: "active",
    configuratorSteps: [
      {
        id: "step-1",
        title: "Project Scale",
        description: "Define the scope and complexity of your project",
        options: [
          {
            id: "scale-mvp",
            label: "MVP",
            description: "Core features, 5-10 pages, basic auth",
            priceModifier: 0,
          },
          {
            id: "scale-standard",
            label: "Standard",
            description: "Full features, 15-25 pages, advanced auth & roles",
            priceModifier: 5000,
          },
          {
            id: "scale-enterprise",
            label: "Enterprise",
            description: "Complex systems, 30+ pages, multi-tenant, SSO",
            priceModifier: 15000,
          },
        ],
      },
      {
        id: "step-2",
        title: "Tech Stack",
        description: "Choose your preferred technology stack",
        options: [
          {
            id: "stack-next",
            label: "Next.js + Node.js",
            description: "React-based full-stack with server components",
            priceModifier: 0,
          },
          {
            id: "stack-react-python",
            label: "React + Python",
            description: "React frontend with FastAPI or Django backend",
            priceModifier: 1000,
          },
          {
            id: "stack-custom",
            label: "Custom Stack",
            description: "Tailored stack based on your requirements",
            priceModifier: 2000,
          },
        ],
      },
      {
        id: "step-3",
        title: "Infrastructure",
        description: "Select your hosting and infrastructure preferences",
        options: [
          {
            id: "infra-shared",
            label: "Shared Cloud",
            description: "Vercel/Railway with managed databases",
            priceModifier: 0,
          },
          {
            id: "infra-dedicated",
            label: "Dedicated Server",
            description: "AWS/GCP with custom configuration",
            priceModifier: 2000,
          },
          {
            id: "infra-kubernetes",
            label: "Kubernetes Cluster",
            description: "Full K8s setup with auto-scaling & monitoring",
            priceModifier: 5000,
          },
        ],
      },
    ],
  },
  {
    id: "svc-002",
    name: "API Architecture & Development",
    slug: "api-architecture-development",
    description:
      "Design and build scalable RESTful or GraphQL APIs with comprehensive documentation, testing suites, and monitoring dashboards.",
    shortDescription: "Scalable API design, development & documentation",
    basePrice: 3000,
    category: "api-development",
    imageUrl: "/services/api-dev.svg",
    features: [
      "API Design",
      "Documentation",
      "Testing Suite",
      "Rate Limiting",
      "Monitoring",
      "SDK Generation",
    ],
    deliveryTimeDays: 30,
    status: "active",
    configuratorSteps: [
      {
        id: "step-1",
        title: "API Type",
        description: "Choose the API architecture pattern",
        options: [
          {
            id: "api-rest",
            label: "RESTful API",
            description: "Standard REST with OpenAPI documentation",
            priceModifier: 0,
          },
          {
            id: "api-graphql",
            label: "GraphQL API",
            description: "Flexible queries with schema-first design",
            priceModifier: 1500,
          },
          {
            id: "api-grpc",
            label: "gRPC Services",
            description: "High-performance binary protocol",
            priceModifier: 2000,
          },
        ],
      },
      {
        id: "step-2",
        title: "Endpoints",
        description: "Estimated number of API endpoints",
        options: [
          {
            id: "endpoints-small",
            label: "10-20 Endpoints",
            description: "Small API with core CRUD operations",
            priceModifier: 0,
          },
          {
            id: "endpoints-medium",
            label: "20-50 Endpoints",
            description: "Medium API with complex business logic",
            priceModifier: 3000,
          },
          {
            id: "endpoints-large",
            label: "50+ Endpoints",
            description: "Large-scale API with microservice patterns",
            priceModifier: 8000,
          },
        ],
      },
    ],
  },
  {
    id: "svc-003",
    name: "Cloud Infrastructure Setup",
    slug: "cloud-infrastructure-setup",
    description:
      "Complete cloud infrastructure design and implementation with IaC, CI/CD pipelines, monitoring, and security hardening.",
    shortDescription: "Cloud infra with IaC, CI/CD & monitoring",
    basePrice: 4000,
    category: "cloud-infrastructure",
    imageUrl: "/services/cloud-infra.svg",
    features: [
      "IaC (Terraform)",
      "CI/CD Pipelines",
      "Monitoring Stack",
      "Security Hardening",
      "Auto-Scaling",
      "Disaster Recovery",
    ],
    deliveryTimeDays: 21,
    status: "active",
    configuratorSteps: [
      {
        id: "step-1",
        title: "Cloud Provider",
        description: "Select your cloud platform",
        options: [
          {
            id: "cloud-aws",
            label: "AWS",
            description: "Amazon Web Services infrastructure",
            priceModifier: 0,
          },
          {
            id: "cloud-gcp",
            label: "Google Cloud",
            description: "Google Cloud Platform infrastructure",
            priceModifier: 0,
          },
          {
            id: "cloud-multi",
            label: "Multi-Cloud",
            description: "Hybrid multi-cloud architecture",
            priceModifier: 5000,
          },
        ],
      },
      {
        id: "step-2",
        title: "Scale",
        description: "Expected traffic and resource requirements",
        options: [
          {
            id: "scale-startup",
            label: "Startup",
            description: "Up to 10K daily users, basic HA",
            priceModifier: 0,
          },
          {
            id: "scale-growth",
            label: "Growth",
            description: "Up to 100K daily users, full HA & CDN",
            priceModifier: 3000,
          },
          {
            id: "scale-enterprise",
            label: "Enterprise",
            description: "Unlimited scale, global distribution",
            priceModifier: 10000,
          },
        ],
      },
    ],
  },
  {
    id: "svc-004",
    name: "Security Audit & Hardening",
    slug: "security-audit-hardening",
    description:
      "Comprehensive security assessment including penetration testing, code review, vulnerability scanning, and remediation with detailed reporting.",
    shortDescription: "Full security audit with pen testing & remediation",
    basePrice: 6000,
    category: "security-audit",
    imageUrl: "/services/security.svg",
    features: [
      "Penetration Testing",
      "Code Review",
      "Vulnerability Scan",
      "Compliance Check",
      "Remediation Plan",
      "Follow-up Audit",
    ],
    deliveryTimeDays: 14,
    status: "active",
    configuratorSteps: [
      {
        id: "step-1",
        title: "Scope",
        description: "Define the audit scope",
        options: [
          {
            id: "scope-app",
            label: "Application Only",
            description: "Web app security assessment",
            priceModifier: 0,
          },
          {
            id: "scope-full",
            label: "Full Stack",
            description: "App + infrastructure + network audit",
            priceModifier: 4000,
          },
          {
            id: "scope-compliance",
            label: "Compliance Audit",
            description: "SOC 2 / HIPAA / PCI-DSS compliance",
            priceModifier: 8000,
          },
        ],
      },
    ],
  },
];

// --- Category Labels ---
export const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  templates: "Templates",
  components: "UI Components",
  plugins: "Plugins & SDKs",
  tools: "Developer Tools",
  scripts: "Scripts & Automation",
  apis: "APIs & Gateways",
};

export const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  "web-development": "Web Development",
  "api-development": "API Development",
  "cloud-infrastructure": "Cloud Infrastructure",
  "security-audit": "Security Audit",
  consulting: "Consulting",
  maintenance: "Maintenance",
};

// --- Analytics Mock Data ---
export const MOCK_REVENUE_DATA: { date: string; revenue: number; orders: number }[] = [
  { date: "Jan", revenue: 12400, orders: 34 },
  { date: "Feb", revenue: 18200, orders: 48 },
  { date: "Mar", revenue: 15800, orders: 42 },
  { date: "Apr", revenue: 24600, orders: 65 },
  { date: "May", revenue: 21300, orders: 56 },
  { date: "Jun", revenue: 28900, orders: 72 },
  { date: "Jul", revenue: 32100, orders: 85 },
  { date: "Aug", revenue: 29400, orders: 78 },
  { date: "Sep", revenue: 35600, orders: 94 },
  { date: "Oct", revenue: 31200, orders: 82 },
  { date: "Nov", revenue: 42800, orders: 112 },
  { date: "Dec", revenue: 48500, orders: 128 },
];
