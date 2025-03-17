"use client";

import { useState } from 'react';
import Link from 'next/link';
import * as analytics from '@/lib/analytics';

export default function PaymentTestPage() {
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleStartCheckout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Track this checkout in analytics
      analytics.trackCheckoutStart(99, 'Test Product');
      
      // Create checkout session
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: 'Test Product',
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          mode: 'payment',
          successUrl: `${window.location.origin}/payment-test/success`,
          cancelUrl: `${window.location.origin}/payment-test`,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }
      
      setSessionId(data.sessionId);
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-4xl font-extrabold text-white mb-4">Payment Integration Test</h1>
          <p className="text-xl text-indigo-200">Test the Stripe payment integration</p>
        </div>
        
        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-gray-900">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Payment Flow</h2>
            
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">About This Test</h3>
                <p className="text-gray-700 mb-4">
                  This page allows you to test the complete payment flow, including:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                  <li>Creating a Stripe checkout session</li>
                  <li>Redirecting to the Stripe payment page</li>
                  <li>Processing webhook events</li>
                  <li>Tracking analytics events</li>
                </ul>
                <p className="text-gray-700">
                  Use Stripe test cards to complete this payment without actual charges.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Test Product</h3>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-1">Test Product</p>
                    <p className="text-gray-500">Single payment for testing purposes</p>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600 mt-2 md:mt-0">$99.00</p>
                </div>
                
                <div className="mt-8">
                  <button
                    onClick={handleStartCheckout}
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </button>
                </div>
                
                {error && (
                  <div className="mt-4 bg-red-50 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Test Card Details</h3>
                <div className="bg-white p-4 rounded border border-gray-200 font-mono text-sm">
                  <p><span className="text-gray-500">Card:</span> 4242 4242 4242 4242</p>
                  <p><span className="text-gray-500">Expiry:</span> Any future date (e.g., 12/25)</p>
                  <p><span className="text-gray-500">CVC:</span> Any 3 digits (e.g., 123)</p>
                  <p><span className="text-gray-500">ZIP:</span> Any 5 digits (e.g., 12345)</p>
                </div>
              </div>
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
