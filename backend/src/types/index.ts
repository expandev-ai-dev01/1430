export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    timestamp: string;
    [key: string]: any;
  };
}

export interface ListResponse<T> {
  success: boolean;
  data: T[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
    hasNext: boolean;
    hasPrevious: boolean;
    timestamp: string;
  };
}
