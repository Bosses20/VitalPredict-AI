'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PurchaseButtonProps {
  email?: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
  customData?: Record<string, any>;
}

/**
 * PurchaseButton - A component for initiating the Stripe checkout process
 * 
 * @param {string} email - Optional pre-filled email for checkout
 * @param {string} label - Button text
 * @param {string} className - Additional CSS classes
 * @param {boolean} fullWidth - Whether the button should take up full width
 * @param {object} customData - Additional data to pass to the checkout
 */
export default function PurchaseButton({
  email,
  label = 'Get Early Access',
  className = '',
  fullWidth = false,
  customData = {},
}: PurchaseButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Default button class based on fullWidth
  const baseClass = `inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md
                      text-black bg-lime-400 hover:bg-lime-500 focus:outline-none
                      focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 
                      transition ease-in-out duration-150 ${fullWidth ? 'w-full' : ''}`;

  // Handle purchase click
  const handlePurchaseClick = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          customData: {
            ...customData,
            source: 'purchase_button',
            url: window.location.href
          }
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to create checkout session');
      }

      // Redirect to the Stripe Checkout
      window.location.href = result.checkoutUrl;
    } catch (err: any) {
      console.error('Purchase button error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handlePurchaseClick}
        disabled={loading}
        className={`${baseClass} ${className} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        aria-label="Purchase early access"
      >
        {loading ? 'Processing...' : label}
      </button>
      
      {error && (
        <div className="mt-2 text-red-600 text-sm">{error}</div>
      )}
    </div>
  );
}
