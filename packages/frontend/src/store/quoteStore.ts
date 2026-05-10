import { create } from 'zustand';
import { Quote } from '@/types';

interface QuoteStore {
  quotes: Quote[];
  selectedQuote: Quote | null;
  isLoading: boolean;
  error: string | null;

  setQuotes: (quotes: Quote[]) => void;
  setSelectedQuote: (quote: Quote | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addQuote: (quote: Quote) => void;
  removeQuote: (id: string) => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
  quotes: [],
  selectedQuote: null,
  isLoading: false,
  error: null,

  setQuotes: (quotes) => set({ quotes }),
  setSelectedQuote: (quote) => set({ selectedQuote: quote }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addQuote: (quote) =>
    set((state) => ({
      quotes: [quote, ...state.quotes],
    })),
  removeQuote: (id) =>
    set((state) => ({
      quotes: state.quotes.filter((q) => q.id !== id),
    })),
}));
