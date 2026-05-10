'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { quoteApi } from '@/lib/api';
import { useState } from 'react';
import { useQuoteStore } from '@/store/quoteStore';
import { useQuery } from '@tanstack/react-query';

const quoteSchema = z.object({
  originZip: z.string().min(5, 'Valid ZIP code required'),
  destinationZip: z.string().min(5, 'Valid ZIP code required'),
  weight: z.coerce.number().positive('Weight must be positive'),
  freightClass: z.string().min(1, 'Freight class required'),
  quantity: z.coerce.number().int().positive('Quantity must be positive'),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const freightClasses = ['50', '55', '60', '65', '70', '85', '100', '125', '150', '250', '500'];

const QuoteForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const addQuote = useQuoteStore((state) => state.addQuote);

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    try {
      const quotes = await quoteApi.createQuote(data);
      quotes.forEach((quote) => addQuote(quote));
      setSuccessMessage(`Successfully generated ${quotes.length} quote(s)!`);
      reset();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error creating quote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Generate Quote</h2>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Origin ZIP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Origin ZIP Code</label>
          <input
            {...register('originZip')}
            placeholder="10001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.originZip && <p className="text-red-500 text-sm mt-1">{errors.originZip.message}</p>}
        </div>

        {/* Destination ZIP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination ZIP Code</label>
          <input
            {...register('destinationZip')}
            placeholder="90001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.destinationZip && <p className="text-red-500 text-sm mt-1">{errors.destinationZip.message}</p>}
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
          <input
            {...register('weight')}
            type="number"
            placeholder="5000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
        </div>

        {/* Freight Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Freight Class</label>
          <select
            {...register('freightClass')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Freight Class</option>
            {freightClasses.map((fc) => (
              <option key={fc} value={fc}>
                Class {fc}
              </option>
            ))}
          </select>
          {errors.freightClass && <p className="text-red-500 text-sm mt-1">{errors.freightClass.message}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <input
            {...register('quantity')}
            type="number"
            placeholder="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {isSubmitting ? 'Generating Quote...' : 'Generate Quote'}
      </button>
    </form>
  );
};

export default QuoteForm;
