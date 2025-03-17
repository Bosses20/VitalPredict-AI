"use client";

import { useEffect, useState } from 'react';
import * as analytics from '@/lib/analytics';
import { checkAnalyticsSetup, logTestEvent, debugAnalyticsConfig } from '@/utils/analytics-test';
import Link from 'next/link';

export default function PublicAnalyticsTestPage() {
  const [analyticsStatus, setAnalyticsStatus] = useState<{
    success: boolean;
    issues: string[];
    measurementId?: string | null;
  } | null>(null);
  
  const [testEventSent, setTestEventSent] = useState(false);
  const [pageviewTracked, setPageviewTracked] = useState(false);
  
  useEffect(() => {
    // Initialize Google Analytics
    analytics.initGA();
    
    // Check analytics setup
    const status = checkAnalyticsSetup();
    setAnalyticsStatus(status);
    
    // Track page view for this test page
    analytics.pageview('/analytics-test');
    setPageviewTracked(true);
  }, []);
  
  const handleSendTestEvent = () => {
    logTestEvent();
    setTestEventSent(true);
    
    // Track button click through our analytics
    analytics.trackButtonClick('send-test-event', 'analytics-test-page');
  };
  
  const handleDebugConfiguration = () => {
    debugAnalyticsConfig();
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
          <h1 className="text-4xl font-extrabold text-white mb-4">Analytics Integration Test</h1>
          <p className="text-xl text-indigo-200">Verify that Google Analytics is properly configured</p>
        </div>
        
        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Status Card */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Configuration Status</h2>
            
            {analyticsStatus ? (
              <div className="space-y-6">
                <div className="flex items-center">
                  {analyticsStatus.success ? (
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-full p-2 mr-4">
                        <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">Analytics properly configured</p>
                        <p className="text-gray-500">Your Google Analytics integration is working correctly</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="bg-red-100 rounded-full p-2 mr-4">
                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">Issues detected</p>
                        <p className="text-gray-500">Please check the issues listed below</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {analyticsStatus.measurementId && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium text-gray-700">Measurement ID:</span>
                    </div>
                    <code className="bg-gray-100 px-3 py-2 rounded-md text-sm font-mono text-gray-800 block">{analyticsStatus.measurementId}</code>
                  </div>
                )}
                
                {analyticsStatus.issues.length > 0 && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-medium text-red-800 mb-2">Issues Found:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {analyticsStatus.issues.map((issue, index) => (
                        <li key={index} className="text-red-700">{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-24">
                <div className="inline-flex items-center px-4 py-2 text-sm leading-5 font-medium text-gray-700">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking analytics configuration...
                </div>
              </div>
            )}
          </div>
          
          {/* Testing Card */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Analytics Tracking</h2>
            
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Page View Tracking</h3>
                <div className="flex items-center">
                  {pageviewTracked ? (
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-full p-1 mr-3">
                        <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-800">Page view successfully tracked</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full p-1 mr-3">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-500">Page view not tracked yet</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Test Event Tracking</h3>
                <div className="flex items-center mb-6">
                  {testEventSent ? (
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-full p-1 mr-3">
                        <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-800">Test event successfully sent</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full p-1 mr-3">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-500">No test event sent yet</span>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={handleSendTestEvent}
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
                >
                  Send Test Event
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Debug Configuration</h3>
                <button 
                  onClick={handleDebugConfiguration}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
                >
                  Debug Configuration
                </button>
                <p className="mt-3 text-sm text-gray-500 text-center">
                  Check your browser console for detailed debug information
                </p>
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
