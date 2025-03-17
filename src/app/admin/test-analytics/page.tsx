"use client";

import { useEffect, useState } from 'react';
import * as analytics from '@/lib/analytics';
import { checkAnalyticsSetup, logTestEvent, debugAnalyticsConfig } from '@/utils/analytics-test';

export default function TestAnalyticsPage() {
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
    analytics.pageview('/admin/test-analytics');
    setPageviewTracked(true);
  }, []);
  
  const handleSendTestEvent = () => {
    const result = logTestEvent();
    if (result) {
      setTestEventSent(true);
    }
  };
  
  const handleDebugConfiguration = () => {
    debugAnalyticsConfig();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Google Analytics Test Page</h1>
        
        <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics Configuration Status</h2>
          
          {analyticsStatus ? (
            <div>
              <div className="flex items-center mb-4">
                <div className={`w-4 h-4 rounded-full mr-2 ${analyticsStatus.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-medium">{analyticsStatus.success ? 'Analytics properly configured' : 'Configuration issues detected'}</span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Measurement ID:</p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {analyticsStatus.measurementId || 'Not set'}
                </code>
              </div>
              
              {analyticsStatus.issues.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-600 mb-2">Issues found:</p>
                  <ul className="list-disc pl-5 text-sm text-red-600 space-y-1">
                    {analyticsStatus.issues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Loading configuration status...</p>
          )}
        </div>
        
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${pageviewTracked ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-gray-700">Page view tracking</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${testEventSent ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-gray-700">Test event tracking</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={handleSendTestEvent}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send Test Event
          </button>
          
          <button 
            onClick={handleDebugConfiguration}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Debug Analytics Configuration
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">How to verify tracking is working:</h3>
          <ol className="list-decimal pl-5 text-gray-600 space-y-2">
            <li>Make sure you've added your Google Analytics Measurement ID to your <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">.env.local</code> file</li>
            <li>Click the "Send Test Event" button above</li>
            <li>Open your Google Analytics dashboard</li>
            <li>Go to "Reports" → "Realtime" → "Events"</li>
            <li>You should see the test event appear within a few minutes</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
