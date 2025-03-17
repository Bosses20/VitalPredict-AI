"use client";

import { useEffect, useState } from 'react';
import * as analytics from '@/lib/analytics';
import { checkAnalyticsSetup, logTestEvent, debugAnalyticsConfig } from '@/utils/analytics-test';

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
  };
  
  const handleDebugConfiguration = () => {
    debugAnalyticsConfig();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Google Analytics Public Test Page</h1>
        
        <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics Configuration Status</h2>
          
          {analyticsStatus ? (
            <div>
              <div className="flex items-center mb-4">
                <span className={`inline-block w-4 h-4 rounded-full mr-2 ${analyticsStatus.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="font-medium">{analyticsStatus.success ? 'Analytics properly configured' : 'Issues detected'}</span>
              </div>
              
              {analyticsStatus.measurementId && (
                <div className="mb-4">
                  <span className="font-medium">Measurement ID: </span>
                  <code className="bg-gray-100 px-2 py-1 rounded">{analyticsStatus.measurementId}</code>
                </div>
              )}
              
              {analyticsStatus.issues.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Issues:</h3>
                  <ul className="list-disc pl-5">
                    {analyticsStatus.issues.map((issue, index) => (
                      <li key={index} className="text-red-600">{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p>Checking analytics configuration...</p>
          )}
        </div>
        
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Analytics</h2>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Page View Tracking</h3>
            <div className="flex items-center">
              <span className={`inline-block w-4 h-4 rounded-full mr-2 ${pageviewTracked ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              <span>{pageviewTracked ? 'Page view tracked' : 'Page view not tracked yet'}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Test Event</h3>
            <div className="flex items-center mb-4">
              <span className={`inline-block w-4 h-4 rounded-full mr-2 ${testEventSent ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              <span>{testEventSent ? 'Test event sent' : 'No test event sent yet'}</span>
            </div>
            <button 
              onClick={handleSendTestEvent}
              className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Send Test Event
            </button>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Debug Configuration</h3>
            <button 
              onClick={handleDebugConfiguration}
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Debug Configuration
            </button>
            <p className="mt-2 text-sm text-gray-500">Check browser console for debug information.</p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-500">
            This page is used to test Google Analytics integration for VitalPredict AI.
          </p>
        </div>
      </div>
    </div>
  );
}
