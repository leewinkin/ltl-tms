'use client';

import { useQuery } from '@tanstack/react-query';
import { quoteApi } from '@/lib/api';
import { useQuoteStore } from '@/store/quoteStore';
import { useEffect } from 'react';
import QuoteForm from '@/components/QuoteForm';
import QuotesList from '@/components/QuotesList';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const setQuotes = useQuoteStore((state) => state.setQuotes);

  const { data: quotesData, isLoading } = useQuery({
    queryKey: ['quotes'],
    queryFn: () => quoteApi.getQuotes(1, 20),
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (quotesData?.data) {
      setQuotes(quotesData.data);
    }
  }, [quotesData?.data, setQuotes]);

  const quotes = useQuoteStore((state) => state.quotes);
  const totalQuotes = quotes.length;
  const averageCost = quotes.length > 0 ? (quotes.reduce((sum, q) => sum + q.cost, 0) / quotes.length).toFixed(2) : '0';
  const uniqueCarriers = new Set(quotes.map((q) => q.carrier)).size;

  // Chart data
  const carrierData = quotes.reduce((acc: any, quote) => {
    const existing = acc.find((item: any) => item.carrier === quote.carrier);
    if (existing) {
      existing.count += 1;
      existing.avgCost = (existing.avgCost + quote.cost) / 2;
    } else {
      acc.push({ carrier: quote.carrier, count: 1, avgCost: quote.cost });
    }
    return acc;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Quotes</p>
              <p className="text-3xl font-bold text-gray-900">{totalQuotes}</p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Cost</p>
              <p className="text-3xl font-bold text-gray-900">${averageCost}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Carriers</p>
              <p className="text-3xl font-bold text-gray-900">{uniqueCarriers}</p>
            </div>
            <div className="text-4xl">🚚</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      {carrierData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Quotes by Carrier</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={carrierData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="carrier" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Quote Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Quote Form and List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <QuoteForm />
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Recent Quotes</h2>
          {isLoading ? <p>Loading...</p> : <QuotesList />}
        </div>
      </div>
    </div>
  );
}
