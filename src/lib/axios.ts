import axios, { AxiosError, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

// Create axios instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  async (config) => {
    // Add request ID for tracking
    config.headers["X-Request-ID"] = `req_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
        {
          data: config.data,
          headers: config.headers,
        }
      );
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `✅ API Response: ${response.config.method?.toUpperCase()} ${
          response.config.url
        }`,
        {
          status: response.status,
          data: response.data,
        }
      );
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error(
        `❌ API Error: ${error.config?.method?.toUpperCase()} ${
          error.config?.url
        }`,
        {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        }
      );
    }

    // Handle 401 Unauthorized - Redirect to login
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/signin";
      }
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.",
        code: "NETWORK_ERROR",
        originalError: error,
      });
    }

    // Handle specific error status codes
    const errorMessage = getErrorMessage(
      error.response.status,
      error.response.data
    );

    return Promise.reject({
      message: errorMessage,
      status: error.response.status,
      data: error.response.data,
      originalError: error,
    });
  }
);

// Helper function to get user-friendly error messages
function getErrorMessage(status: number, data: any): string {
  // Check if API returns custom error message
  if (data?.message) {
    return data.message;
  }

  // Default messages based on status code
  switch (status) {
    case 400:
      return "Dữ liệu gửi lên không hợp lệ. Vui lòng kiểm tra lại.";
    case 401:
      return "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
    case 403:
      return "Bạn không có quyền thực hiện hành động này.";
    case 404:
      return "Không tìm thấy tài nguyên yêu cầu.";
    case 409:
      return "Dữ liệu đã tồn tại hoặc xung đột với dữ liệu hiện tại.";
    case 422:
      return "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.";
    case 429:
      return "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.";
    case 500:
      return "Lỗi máy chủ nội bộ. Vui lòng thử lại sau.";
    case 502:
      return "Lỗi kết nối với máy chủ. Vui lòng thử lại sau.";
    case 503:
      return "Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.";
    default:
      return "Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.";
  }
}

// Helper types
export interface ApiError {
  message: string;
  status?: number;
  data?: any;
  code?: string;
  originalError?: AxiosError;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export default apiClient;
