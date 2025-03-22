import { Metadata } from "next";
import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { generateCanonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Thank You | VitalPredict AI",
  description: "Thank you for your purchase of VitalPredict AI. Your journey to better diabetes management starts now.",
  alternates: {
    canonical: generateCanonicalUrl({ path: '/thank-you' }),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Success Icon */}
        <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
          <svg 
            className="h-12 w-12 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold">
          Thank You for Your Purchase!
        </h1>
        
        <p className="text-xl text-gray-300 mt-4">
          Your payment has been successfully processed.
        </p>
        
        <div className="bg-gray-900 p-8 rounded-lg mt-8 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">What Happens Next?</h2>
          
          <div className="text-left space-y-4 text-gray-300">
            <p>
              <span className="font-bold text-white">1.</span> You&apos;ll receive an email confirmation with your receipt and order details.
            </p>
            <p>
              <span className="font-bold text-white">2.</span> We&apos;ll keep you updated on the development progress of VitalPredict AI.
            </p>
            <p>
              <span className="font-bold text-white">3.</span> When we launch, you&apos;ll be among the first to get access to the platform.
            </p>
            <p>
              <span className="font-bold text-white">4.</span> As an early supporter, you&apos;ll have lifetime access to VitalPredict AI.
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <Button variant="outlined" className="mr-4">
            <Link href="/">
              Return to Homepage
            </Link>
          </Button>
          
          <Button variant="primary">
            <a href="mailto:support@vitalpredictai.com">
              Contact Support
            </a>
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-8">
          If you have any questions, please contact us at{" "}
          <a href="mailto:support@vitalpredictai.com" className="text-blue-400 hover:text-blue-300">
            support@vitalpredictai.com
          </a>
        </p>
      </div>
    </div>
  );
}
