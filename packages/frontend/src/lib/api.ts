import axios, { AxiosInstance } from 'axios';
import { Quote, CreateQuoteRequest, QuoteResponse, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Quote API endpoints
export const quoteApi = {
  // Create a new quote
  createQuote: async (data: CreateQuoteRequest): Promise<Quote[]> => {
    const response = await apiClient.post<QuoteResponse>('/quotes', data);
    return response.data.data;
  },

  // Get all quotes with pagination
  getQuotes: async (page: number = 1, pageSize: number = 20) => {
    const response = await apiClient.get<any>('/quotes', {
      params: { page, pageSize },
    });
    return response.data;
  },

  // Get a specific quote
  getQuote: async (id: string): Promise<Quote> => {
    const response = await apiClient.get<ApiResponse<Quote>>(`/quotes/${id}`);
    return response.data.data!;
  },

  // Get best quote for a route
  getBestQuote: async (originZip: string, destinationZip: string): Promise<Quote> => {
    const response = await apiClient.get<ApiResponse<Quote>>(
      `/quotes/best/${originZip}/${destinationZip}`
    );
    return response.data.data!;
  },

  // Get quotes by carrier
  getQuotesByCarrier: async (carrier: string): Promise<Quote[]> => {
    const response = await apiClient.get<QuoteResponse>(`/quotes/carrier/${carrier}`);
    return response.data.data;
  },

  // Delete (expire) a quote
  deleteQuote: async (id: string): Promise<Quote> => {
    const response = await apiClient.delete<ApiResponse<Quote>>(`/quotes/${id}`);
    return response.data.data!;
  },
};

export default apiClient;
