'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            LTL Transportation Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your LTL shipment process with automated quoting, booking, and tracking
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/quotes"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Generate Quote
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Real-time Quoting</h3>
              <p className="text-gray-600">Get instant quotes from multiple carriers</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Convert quotes to shipments in seconds</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Live Tracking</h3>
              <p className="text-gray-600">Monitor shipments in real-time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
