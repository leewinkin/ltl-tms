'use client';

import { Quote } from '@/types';
import { useQuoteStore } from '@/store/quoteStore';
import { format } from 'date-fns';
import { TrashIcon } from '@heroicons/react/24/outline';
import { quoteApi } from '@/lib/api';
import { useState } from 'react';

const QuotesList = () => {
  const quotes = useQuoteStore((state) => state.quotes);
  const removeQuote = useQuoteStore((state) => state.removeQuote);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await quoteApi.deleteQuote(id);
      removeQuote(id);
    } catch (error) {
      console.error('Error deleting quote:', error);
    } finally {
      setDeleting(null);
    }
  };

  if (quotes.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No quotes available. Generate one to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Route</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Weight</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Carrier</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Cost</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Expires</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {quote.originZip} → {quote.destinationZip}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{quote.weight} lbs</td>
                <td className="px-6 py-4 text-sm text-gray-900">{quote.carrier}</td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">${quote.cost.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {format(new Date(quote.expiresAt), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleDelete(quote.id)}
                    disabled={deleting === quote.id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuotesList;
