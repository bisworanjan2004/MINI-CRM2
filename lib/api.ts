import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401 && typeof window !== "undefined") {
      // Clear localStorage and redirect to login
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getCurrentUser: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) => api.post("/auth/reset-password", { token, password }),
  changePassword: (passwordData) => api.post("/auth/change-password", passwordData),
}

// Leads API
export const leadAPI = {
  getLeads: (params) => api.get("/leads", { params }),
  getLead: (id) => api.get(`/leads/${id}`),
  createLead: (leadData) => api.post("/leads", leadData),
  updateLead: (id, leadData) => api.put(`/leads/${id}`, leadData),
  deleteLead: (id) => api.delete(`/leads/${id}`),
  addActivity: (id, activityData) => api.post(`/leads/${id}/activities`, activityData),
  getLeadStats: () => api.get("/leads/stats"),
}

// Quotations API
export const quotationAPI = {
  getQuotations: (params) => api.get("/quotations", { params }),
  getQuotation: (id) => api.get(`/quotations/${id}`),
  createQuotation: (quotationData) => api.post("/quotations", quotationData),
  updateQuotation: (id, quotationData) => api.put(`/quotations/${id}`, quotationData),
  deleteQuotation: (id) => api.delete(`/quotations/${id}`),
  sendQuotation: (id) => api.post(`/quotations/${id}/send`),
  getQuotationStats: () => api.get("/quotations/stats"),
}

// Reports API
export const reportAPI = {
  getLeadsReport: (params) => api.get("/reports/leads", { params }),
  getQuotationsReport: (params) => api.get("/reports/quotations", { params }),
  getConversionReport: (params) => api.get("/reports/conversion", { params }),
  getSalesPerformanceReport: (params) => api.get("/reports/sales-performance", { params }),
  getDashboardStats: () => api.get("/reports/dashboard-stats"),
}

// Users API
export const userAPI = {
  getUsers: () => api.get("/users"),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  updateUserSettings: (id, settingsData) => api.put(`/users/${id}/settings`, settingsData),
  updateUserSecurity: (id, securityData) => api.put(`/users/${id}/security`, securityData),
  getUserLoginHistory: (id) => api.get(`/users/${id}/login-history`),
}

// Settings API
export const settingAPI = {
  getCompanySettings: () => api.get("/settings/company"),
  updateCompanySettings: (settingsData) => api.put("/settings/company", settingsData),
  uploadCompanyLogo: (formData) =>
    api.post("/settings/company/logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  addCustomField: (fieldData) => api.post("/settings/custom-fields", fieldData),
  updateCustomField: (id, fieldData) => api.put(`/settings/custom-fields/${id}`, fieldData),
  deleteCustomField: (id) => api.delete(`/settings/custom-fields/${id}`),
}

// Upload API
export const uploadAPI = {
  uploadAvatar: (formData) =>
    api.post("/upload/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  uploadDocument: (formData) =>
    api.post("/upload/document", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
}

export default api
