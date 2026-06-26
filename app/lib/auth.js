import { setTokens, clearTokens } from "./api";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"}/auth/login/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setTokens(data.tokens.access, data.tokens.refresh);
      localStorage.setItem("authUser", "true");
      localStorage.setItem("userRole", data.user.profile?.role || "patient");
      localStorage.setItem("userName", `${data.user.first_name} ${data.user.last_name}`);
      localStorage.setItem("userEmail", data.user.email);
      return { success: true, data };
    } else {
      const errorMsg = typeof data.error === "string"
        ? data.error
        : typeof data.detail === "string"
          ? data.detail
          : "Login failed.";
      return { success: false, error: errorMsg };
    }
  } catch (err) {
    return { success: false, error: "Network error. Please try again." };
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"}/auth/register/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setTokens(data.tokens.access, data.tokens.refresh);
      localStorage.setItem("authUser", "true");
      localStorage.setItem("userRole", data.user.profile?.role || "patient");
      localStorage.setItem("userName", `${data.user.first_name} ${data.user.last_name}`);
      localStorage.setItem("userEmail", data.user.email);
      return { success: true, data };
    } else {
      return { success: false, error: data };
    }
  } catch (err) {
    return { success: false, error: "Network error. Please try again." };
  }
};

export const logoutUser = async () => {
  try {
    const refresh = localStorage.getItem("refresh_token");
    const access = localStorage.getItem("access_token");
    if (refresh && access) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"}/auth/logout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({ refresh }),
        }
      );
    }
  } catch {
    // silent fail
  } finally {
    clearTokens();
  }
};

export const getUserRole = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userRole");
  }
  return null;
};

export const getUserName = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userName");
  }
  return null;
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("authUser");
  }
  return false;
};