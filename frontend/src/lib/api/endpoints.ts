import { api } from './client';
import type {
  Division,
  Product,
  AirFilter,
  Project,
  ClientPartner,
  SiteSettings,
  Lead,
  ApiResponse,
} from '../../types/api';

export const ApiService = {
  // 1. Probes & Settings
  getHealth: () => api.get('/health'),
  getSettings: async (): Promise<SiteSettings> => {
    const res = await api.get<ApiResponse<SiteSettings>>('/settings');
    return res.data.data;
  },
  updateSetting: (key: string, value: any, description?: string) =>
    api.patch(`/settings/${key}`, { value, description }),

  // 2. Turnkey Divisions
  getDivisions: async (): Promise<Division[]> => {
    const res = await api.get<ApiResponse<Division[]>>('/divisions');
    return res.data.data;
  },
  getDivisionBySlug: async (slug: string): Promise<{ division: Division; products: Product[] }> => {
    const res = await api.get<ApiResponse<{ division: Division; products: Product[] }>>(`/divisions/${slug}`);
    return res.data.data;
  },

  // 3. Products
  getProducts: async (params?: {
    mode?: 'cursor' | 'offset';
    limit?: number;
    cursor?: string;
    page?: number;
    divisionId?: string;
    category?: string;
    featured?: boolean;
    search?: string;
  }) => {
    const res = await api.get<ApiResponse<Product[]>>('/products', { params });
    return res.data;
  },
  getProductBySlug: async (slug: string): Promise<Product> => {
    const res = await api.get<ApiResponse<Product>>(`/products/${slug}`);
    return res.data.data;
  },
  createProduct: (data: Partial<Product>) => api.post('/products', data),
  updateProduct: (id: string, data: Partial<Product>) => api.patch(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  reorderProducts: (items: Array<{ id: string; order: number }>) =>
    api.patch('/products/reorder', { items }),

  // 4. Air Filtration Catalog
  getFilters: async (category?: string): Promise<AirFilter[]> => {
    const res = await api.get<ApiResponse<AirFilter[]>>('/filters', { params: { category } });
    return res.data.data;
  },
  getFilterById: async (id: string): Promise<AirFilter> => {
    const res = await api.get<ApiResponse<AirFilter>>(`/filters/${id}`);
    return res.data.data;
  },
  createFilter: (data: Partial<AirFilter>) => api.post('/filters', data),
  updateFilter: (id: string, data: Partial<AirFilter>) => api.patch(`/filters/${id}`, data),
  deleteFilter: (id: string) => api.delete(`/filters/${id}`),

  // 5. Projects & Case Studies
  getProjects: async (params?: {
    mode?: 'cursor' | 'offset';
    limit?: number;
    cursor?: string;
    page?: number;
    division?: string;
    featured?: boolean;
  }) => {
    const res = await api.get<ApiResponse<Project[]>>('/projects', { params });
    return res.data;
  },
  getProjectById: async (id: string): Promise<Project> => {
    const res = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return res.data.data;
  },
  createProject: (data: Partial<Project>) => api.post('/projects', data),
  updateProject: (id: string, data: Partial<Project>) => api.patch(`/projects/${id}`, data),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),

  // 6. Clients Trust Wall
  getClients: async (): Promise<ClientPartner[]> => {
    const res = await api.get<ApiResponse<ClientPartner[]>>('/clients');
    return res.data.data;
  },
  createClient: (data: Partial<ClientPartner>) => api.post('/clients', data),
  updateClient: (id: string, data: Partial<ClientPartner>) => api.patch(`/clients/${id}`, data),
  deleteClient: (id: string) => api.delete(`/clients/${id}`),

  // 7. Leads & RFQ
  submitLead: async (data: {
    companyName?: string;
    contactName?: string;
    email?: string;
    phone: string;
    location?: string;
    divisions?: string[];
    roomDimensions?: string;
    cfm?: number;
    message: string;
    source: 'rfq_form' | 'contact_form' | 'whatsapp';
  }) => {
    const res = await api.post('/leads', data);
    return res.data;
  },
  getLeads: async (params?: {
    status?: string;
    source?: string;
    division?: string;
    page?: number;
    limit?: number;
  }) => {
    const res = await api.get<ApiResponse<Lead[]>>('/leads', { params });
    return res.data;
  },
  getLeadById: async (id: string): Promise<Lead> => {
    const res = await api.get<ApiResponse<Lead>>(`/leads/${id}`);
    return res.data.data;
  },
  updateLeadStatus: (id: string, status: string, notes?: string) =>
    api.patch(`/leads/${id}/status`, { status, notes }),
  exportLeadsCSV: async () => {
    const res = await api.get('/leads/export', { responseType: 'blob' });
    const blob = new Blob([res.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `gmp_vision_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // 8. Media Uploads
  uploadMedia: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  },
  deleteMedia: (publicId: string) => api.delete(`/media/${encodeURIComponent(publicId)}`),

  // 9. Auth
  login: async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    return res.data.data;
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data.data;
  },
  logout: async () => {
    const res = await api.post('/auth/logout');
    return res.data;
  },
};
