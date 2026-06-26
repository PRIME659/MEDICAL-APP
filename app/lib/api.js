const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// ── Token Management ───────────────────────────────────────────
export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refresh_token");
  }
  return null;
};

export const setTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("authUser");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
};

// ── Refresh Token ──────────────────────────────────────────────
export const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      return data.access;
    }

    // Don't throw — just clear and return null
    clearTokens();
    return null;
  } catch {
    clearTokens();
    return null;
  }
};

export const apiRequest = async (endpoint, options = {}) => {
  let token = getAccessToken();

  const makeRequest = async (accessToken) => {
    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
      return response;
    } catch {
      return null;
    }
  };

  try {
    let response = await makeRequest(token);

    if (!response) return null;

    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        response = await makeRequest(newToken);
        if (!response) return null;
      } else {
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/landing";
        }
        return null;
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Request failed" }));
      throw { status: response.status, data: errorData };
    }

    const data = await response.json().catch(() => null);
    return data;

  } catch (err) {
    if (err?.status && err?.data) {
      throw err;
    }
    console.error("Request error:", err);
    return null;
  }
};

// ── Auth API ───────────────────────────────────────────────────
export const authAPI = {
  register: (data) => apiRequest("/auth/register/", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  login: (data) => apiRequest("/auth/login/", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  logout: () => apiRequest("/auth/logout/", {
    method: "POST",
    body: JSON.stringify({ refresh: getRefreshToken() }),
  }),

  getProfile: () => apiRequest("/auth/profile/"),

  updateProfile: (data) => apiRequest("/auth/profile/update/", {
    method: "PUT",
    body: JSON.stringify(data),
  }),

  changePassword: (data) => apiRequest("/auth/password/change/", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

// ── Doctors API ────────────────────────────────────────────────
export const doctorsAPI = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/doctors/${query ? `?${query}` : ""}`);
  },

  detail: (id) => apiRequest(`/doctors/${id}/`),

  specialties: () => apiRequest("/doctors/specialties/"),
};

// ── Pharmacy API ───────────────────────────────────────────────
export const pharmacyAPI = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/pharmacy/${query ? `?${query}` : ""}`);
  },

  detail: (id) => apiRequest(`/pharmacy/${id}/`),

  categories: () => apiRequest("/pharmacy/categories/"),
};

// ── Cart API ───────────────────────────────────────────────────
export const cartAPI = {
  get: () => apiRequest("/cart/"),

  add: (drugId, quantity) => apiRequest("/cart/add/", {
    method: "POST",
    body: JSON.stringify({ drug_id: drugId, quantity }),
  }),

  update: (id, quantity) => apiRequest(`/cart/${id}/update/`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  }),

  remove: (id) => apiRequest(`/cart/${id}/remove/`, {
    method: "DELETE",
  }),

  clear: () => apiRequest("/cart/clear/", {
    method: "DELETE",
  }),
};

// ── Appointments API ───────────────────────────────────────────
export const appointmentsAPI = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/appointments/${query ? `?${query}` : ""}`);
  },

  book: (data) => apiRequest("/appointments/book/", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  detail: (id) => apiRequest(`/appointments/${id}/`),

  reschedule: (id, data) => apiRequest(`/appointments/${id}/reschedule/`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),

  cancel: (id) => apiRequest(`/appointments/${id}/cancel/`, {
    method: "PUT",
  }),
};

// ── Medical Tips API ───────────────────────────────────────────
export const tipsAPI = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/tips/${query ? `?${query}` : ""}`);
  },

  daily: () => apiRequest("/tips/daily/"),

  detail: (id) => apiRequest(`/tips/${id}/`),
};

// ── Orders API ─────────────────────────────────────────────────
export const ordersAPI = {
  place: (data) => apiRequest("/orders/place/", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  history: () => apiRequest("/orders/history/"),
};

// ── Chatbot API ────────────────────────────────────────────────
export const chatbotAPI = {
  send: (messages) => apiRequest("/chatbot/", {
    method: "POST",
    body: JSON.stringify({ messages }),
  }),
};

// ── Doctor Portal API ──────────────────────────────────────────
export const doctorPortalAPI = {
  dashboard: () => apiRequest("/doctor/dashboard/"),

  appointments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/doctor/appointments/${query ? `?${query}` : ""}`);
  },

  updateAppointment: (id, data) => apiRequest(`/doctor/appointments/${id}/update/`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),

  addNote: (appointmentId, data) => apiRequest(`/doctor/appointments/${appointmentId}/notes/`, {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getNotes: () => apiRequest("/doctor/notes/"),

  updateAvailability: (availability) => apiRequest("/doctor/availability/", {
    method: "PUT",
    body: JSON.stringify({ availability }),
  }),

  getTimeSlots: () => apiRequest("/doctor/time-slots/"),

  addTimeSlot: (data) => apiRequest("/doctor/time-slots/", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getProfile: () => apiRequest("/doctor/profile/"),

  updateProfile: (data) => apiRequest("/doctor/profile/", {
    method: "PUT",
    body: JSON.stringify(data),
  }),
};

// ── Admin Portal API ───────────────────────────────────────────
export const adminAPI = {
  dashboard: () => apiRequest("/admin-portal/dashboard/"),

  analytics: () => apiRequest("/admin-portal/analytics/"),

  users: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/admin-portal/users/${query ? `?${query}` : ""}`);
  },

  toggleUser: (id) => apiRequest(`/admin-portal/users/${id}/toggle/`, {
    method: "PUT",
  }),

  createDoctor: (data) => apiRequest("/admin-portal/doctors/create/", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  updateDoctor: (id, data) => apiRequest(`/admin-portal/doctors/${id}/update/`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),

  deleteDoctor: (id) => apiRequest(`/admin-portal/doctors/${id}/delete/`, {
    method: "DELETE",
  }),

  appointments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/admin-portal/appointments/${query ? `?${query}` : ""}`);
  },

  updateAppointment: (id, data) => apiRequest(`/admin-portal/appointments/${id}/update/`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),

  createDrug: (data) => apiRequest("/admin-portal/drugs/create/", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  updateDrug: (id, data) => apiRequest(`/admin-portal/drugs/${id}/update/`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),

  deleteDrug: (id) => apiRequest(`/admin-portal/drugs/${id}/delete/`, {
    method: "DELETE",
  }),

  createTip: (data) => apiRequest("/admin-portal/tips/create/", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  updateTip: (id, data) => apiRequest(`/admin-portal/tips/${id}/update/`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),

  deleteTip: (id) => apiRequest(`/admin-portal/tips/${id}/delete/`, {
    method: "DELETE",
  }),
};

// ── Pharmacist Portal API ──────────────────────────────────────
export const pharmacistAPI = {
  dashboard: () => apiRequest("/pharmacist/dashboard/"),

  drugs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/pharmacist/drugs/${query ? `?${query}` : ""}`);
  },

  updateStock: (id, stock) => apiRequest(`/pharmacist/drugs/${id}/stock/`, {
    method: "PUT",
    body: JSON.stringify({ stock }),
  }),

  orders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/pharmacist/orders/${query ? `?${query}` : ""}`);
  },

  updateOrder: (id, data) => apiRequest(`/pharmacist/orders/${id}/update/`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
};