export interface Division {
  _id: string;
  number?: number;
  title: string;
  name?: string; // alias for display
  slug: string;
  tagline?: string;
  description: string;
  heroImage?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
  standards?: string[];
  features?: string[];
}

export interface ISpecification {
  key: string;
  value: string;
}

export interface Product {
  _id: string;
  divisionId?: string | Division;
  category: string;
  subcategory?: string;
  name: string;
  slug: string;
  description: string;
  specifications?: ISpecification[];
  specs?: Record<string, any>;
  modelNumber?: string;
  standards?: string[];
  images: string[];
  tags?: string[];
  isFeatured?: boolean;
  featured?: boolean;
  brochureUrl?: string;
  order?: number;
  isActive?: boolean;
  status?: string;
}

export interface AirFilter {
  _id: string;
  category: string;
  name: string;
  micronRating?: string;
  filterClass?: string;
  efficiency?: string;
  initialResistance?: number;
  finalResistance?: number;
  ratedAirflow?: number;
  dimensions?: { length: number; width: number; depth: number };
  frameMaterial?: string;
  gasketType?: string;
  mediaConstruction?: string;
  frame?: string;
  applications?: string[];
  keyFeature?: string;
  images?: string[];
  specSheetUrl?: string;
  order?: number;
  isActive?: boolean;
}

export interface ITestimonial {
  quote: string;
  author: string;
  designation: string;
}

export interface Project {
  _id: string;
  title?: string;
  clientName: string;
  client?: string;
  slug?: string;
  scope: string;
  location: string;
  division: string[] | string;
  completionYear: number;
  completionDate?: string;
  isoClass?: string;
  areaSqFt?: number;
  description: string;
  images: string[];
  isFeatured?: boolean;
  featured?: boolean;
  testimonial?: ITestimonial;
  order?: number;
  isActive?: boolean;
}

export interface ClientPartner {
  _id: string;
  name: string;
  logoUrl: string;
  sector: string;
  website?: string;
  isFeatured: boolean;
  order: number;
  isActive: boolean;
}

export interface SiteSettings {
  contact_phone?: string;
  contact_email?: string;
  whatsapp_hotline?: string;
  company_address?: string;
  experience_years?: number;
  projects_completed?: number;
  clients_served?: number;
  cleanroom_sqft_installed?: number;
  [key: string]: any;
}

export interface Lead {
  _id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  divisions: string[];
  roomDimensions?: string;
  cfm?: number;
  message: string;
  source: 'rfq_form' | 'contact_form' | 'whatsapp';
  status: 'new' | 'contacted' | 'qualified' | 'quoted' | 'converted' | 'closed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    nextCursor?: string | null;
    hasMore?: boolean;
  };
  message?: string;
}
