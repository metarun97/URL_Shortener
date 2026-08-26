import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // Access token expire hua
    if (
      error.response?.status === 404 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token se new access token mangwao
        await axiosInstance.post("/api/auth/refresh");

        // New access token mil gaya
        // Ab wahi purani request dobara bhejo
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        // Refresh token bhi invalid/expire
        // Ab user ko login karwana padega
        console.error("Refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    // Baaki errors
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("Bad Request:", data);
          break;

        case 403:
          console.error("Forbidden:", data);
          break;

        case 404:
          console.error("Not Found:", data);
          break;

        case 500:
          console.error("Server Error:", data);
          break;

        default:
          console.error(`Error (${status}):`, data);
      }
    } else if (error.request) {
      console.error(
        "Network Error: No response received",
        error.request
      );
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
