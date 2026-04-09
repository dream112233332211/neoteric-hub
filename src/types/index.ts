// ============================================================
// The Neoteric Digital Architecture Hub - Type Definitions
// ============================================================

// --- Product Types ---
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  features: string[];
  techStack: string[];
  downloadUrl: string;
  version: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  status: "active" | "draft" | "archived";
}

export type ProductCategory =
  | "templates"
  | "components"
  | "plugins"
  | "tools"
  | "scripts"
  | "apis";

// --- Service Types ---
export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  category: ServiceCategory;
  imageUrl: string;
  features: string[];
  deliveryTimeDays: number;
  configuratorSteps: ConfiguratorStep[];
  status: "active" | "draft" | "archived";
}

export type ServiceCategory =
  | "web-development"
  | "api-development"
  | "cloud-infrastructure"
  | "security-audit"
  | "consulting"
  | "maintenance";

export interface ConfiguratorStep {
  id: string;
  title: string;
  description: string;
  options: ConfiguratorOption[];
}

export interface ConfiguratorOption {
  id: string;
  label: string;
  description: string;
  priceModifier: number;
  icon?: string;
}

export interface ServiceConfiguration {
  serviceId: string;
  selectedOptions: Record<string, string>;
  totalPrice: number;
  estimatedDeliveryDays: number;
}

// --- Cart Types ---
export interface CartItem {
  id: string;
  type: "product" | "service";
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  configuration?: ServiceConfiguration;
}

// --- Order Types ---
export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  customerEmail: string;
  customerName: string;
  paymentIntentId: string;
  createdAt: string;
  updatedAt: string;
  deliveryStatus: DeliveryStatus;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";

export type DeliveryStatus =
  | "pending"
  | "processing"
  | "delivered"
  | "failed";

// --- Admin Analytics Types ---
export interface AnalyticsData {
  revenue: RevenueData[];
  orders: OrderMetrics;
  topProducts: TopProduct[];
  serviceMetrics: ServiceMetric[];
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface OrderMetrics {
  total: number;
  completed: number;
  pending: number;
  failed: number;
  averageValue: number;
}

export interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

export interface ServiceMetric {
  id: string;
  name: string;
  activeProjects: number;
  completedProjects: number;
  averageDeliveryDays: number;
}

// --- API Response Types ---
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// --- Auth Types ---
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
