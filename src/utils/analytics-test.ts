// Test file for Google Analytics integration
// This file provides utility functions to test and debug the analytics setup

import * as analytics from '@/lib/analytics';

/**
 * Checks if Google Analytics is properly configured
 * Returns an object with status and any issues found
 */
export const checkAnalyticsSetup = (): { 
  success: boolean; 
  issues: string[]; 
  measurementId?: string | null;
} => {
  const issues: string[] = [];
  
  // Check if measurement ID is set in environment variables
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) {
    issues.push('NEXT_PUBLIC_GA_MEASUREMENT_ID is not set in environment variables');
  }
  
  // Simple validation of measurement ID format (G-XXXXXXXXXX)
  if (measurementId && !measurementId.match(/^G-[A-Z0-9]+$/i)) {
    issues.push('NEXT_PUBLIC_GA_MEASUREMENT_ID does not match expected format (G-XXXXXXXXXX)');
  }
  
  return {
    success: issues.length === 0,
    issues,
    measurementId
  };
};

/**
 * Logs a test event to verify Google Analytics is working
 * Only runs on client side (browser)
 */
export const logTestEvent = () => {
  if (typeof window === 'undefined') return;
  
  // Log a test event
  analytics.event({
    action: 'test_event',
    category: 'Testing',
    label: 'Analytics Test',
    value: 1,
    timestamp: new Date().toISOString()
  });
  
  console.log('Test event sent to Google Analytics');
  return true;
};

// Debug function to log analytics configuration
export const debugAnalyticsConfig = () => {
  const config = checkAnalyticsSetup();
  
  console.log('===== Google Analytics Debug Info =====');
  console.log(`Measurement ID: ${config.measurementId || 'Not set'}`);
  console.log(`Config valid: ${config.success ? 'Yes' : 'No'}`);
  
  if (config.issues.length > 0) {
    console.log('Issues detected:');
    config.issues.forEach((issue, i) => {
      console.log(`  ${i + 1}. ${issue}`);
    });
  }
  
  return config;
};
