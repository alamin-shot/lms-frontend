export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ApiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: unknown; 
  };
}

// API error response for axios
export interface ApiErrorResponse {
  error: {
    message: string;
    status?: number;
    name?: string;
    details?: unknown;
  };
}