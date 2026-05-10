// Quote types
export interface Quote {
  id: string;
  originZip: string;
  destinationZip: string;
  weight: number;
  freightClass: string;
  quantity: number;
  carrier: string;
  cost: number;
  estimatedDelivery: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuoteRequest {
  originZip: string;
  destinationZip: string;
  weight: number;
  freightClass: string;
  quantity: number;
}

export interface QuoteResponse {
  success: boolean;
  data: Quote[];
  count: number;
}

// Order types
export interface Order {
  id: string;
  quoteId: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
  carrier: string;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
}

// Shipment types
export interface Shipment {
  id: string;
  orderId: string;
  trackingNumber: string;
  status: 'pending' | 'in_transit' | 'out_for_delivery' | 'delivered';
  currentLocation: string;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
