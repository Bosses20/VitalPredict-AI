"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import * as analytics from '@/lib/analytics';

export default function PaymentSuccessPage() {
  useEffect(() => {
    // Track successful payment in analytics
    analytics.trackPurchase(99, 'Test Product', 'test-transaction');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <Link href="/" className="inline-flex items-center">
              <span className="text-2xl font-bold tracking-tight text-white">VitalPredict AI</span>
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">Payment Successful!</h1>
          <p className="text-xl text-indigo-200">Your test payment has been processed</p>
        </div>
        
        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-gray-900">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Payment Test Successful!</h2>
              <p className="mt-2 text-gray-600">Your test payment has been successfully processed.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Test Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Product:</span>
                  <span className="font-medium">Test Product</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium">$99.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium text-green-600">Paid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Test Type:</span>
                  <span className="font-medium">Stripe Integration</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">What Was Tested</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Stripe payment processing</li>
                <li>Webhook handling</li>
                <li>Payment success page redirection</li>
                <li>Analytics event tracking</li>
                <li>Database record creation (if applicable)</li>
              </ul>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Link 
                href="/payment-test"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Payment Test
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-indigo-200">
            <Link href="/" className="font-medium hover:text-white underline">
              Return to Homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
