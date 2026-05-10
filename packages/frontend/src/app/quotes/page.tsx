'use client';

import QuoteForm from '@/components/QuoteForm';
import QuotesList from '@/components/QuotesList';

export default function QuotesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Quotes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <QuoteForm />
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">All Quotes</h2>
          <QuotesList />
        </div>
      </div>
    </div>
  );
}
