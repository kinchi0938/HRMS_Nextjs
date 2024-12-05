const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

const getAuthHeaders = (): HeadersInit => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const createApiClient = () => {
  const handleResponse = async <T>(response: Response): Promise<T> => {
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const error: ApiError = {
        message: isJson ? data.message : "An error occurred",
        status: response.status,
        errors: data.errors,
      };
      throw error;
    }

    return isJson ? data : (data as T);
  };

  return {
    get: async <T>(endpoint: string): Promise<T> => {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: "GET",
          headers: getAuthHeaders(),
          credentials: "include",
        });
        return handleResponse<T>(response);
      } catch (error) {
        throw handleError(error as ApiError | TypeError);
      }
    },

    post: async <T, D = unknown>(endpoint: string, data?: D): Promise<T> => {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: "POST",
          headers: getAuthHeaders(),
          //   credentials: "include",
          credentials: "same-origin",
          mode: "cors",
          body: data ? JSON.stringify(data) : undefined,
        });
        return handleResponse<T>(response);
      } catch (error) {
        throw handleError(error as ApiError | TypeError);
      }
    },

    put: async <T, D = unknown>(endpoint: string, data?: D): Promise<T> => {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          credentials: "include",
          body: data ? JSON.stringify(data) : undefined,
        });
        return handleResponse<T>(response);
      } catch (error) {
        throw handleError(error as ApiError | TypeError);
      }
    },

    delete: async <T>(endpoint: string): Promise<T> => {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
          credentials: "include",
        });
        return handleResponse<T>(response);
      } catch (error) {
        throw handleError(error as ApiError | TypeError);
      }
    },
  };
};

const handleError = (error: ApiError | TypeError): never => {
  // 네트워크 에러
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    throw new Error("Network error occurred. Please check your connection.");
  }

  // API 에러
  if ("status" in error) {
    switch (error.status) {
      case 401:
        // 인증 에러 처리
        localStorage.removeItem("token");
        throw new Error("Authentication failed. Please login again.");
      case 403:
        throw new Error("You do not have permission to perform this action.");
      case 404:
        throw new Error("The requested resource was not found.");
      case 422:
        // Validation 에러
        const validationErrors = error.errors
          ? Object.values(error.errors).flat().join(", ")
          : error.message;
        throw new Error(validationErrors);
      default:
        throw new Error(error.message || "An unexpected error occurred.");
    }
  }

  // 기타 에러
  throw error;
};

// Type definitions for better TypeScript support
export type ApiClient = ReturnType<typeof createApiClient>;
