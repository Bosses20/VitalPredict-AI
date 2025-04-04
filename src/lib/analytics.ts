// Analytics helper for VitalPredict AI
// This file provides a central place to manage analytics tracking

type EventProps = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  [key: string]: string | number | boolean | undefined;
};

// GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-6K59GJ6KTC';

// Define the Window interface extension for gtag
interface GTagWindow extends Window {
  dataLayer: Array<unknown>;
  gtag: (...args: unknown[]) => void;
}

// Check if window and Google Analytics objects are available (client-side only)
const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof (window as GTagWindow).gtag !== 'undefined';
};

// Initialize Google Analytics
export const initGA = (): boolean => {
  if (isGAAvailable()) return true; // Already initialized
  
  try {
    // Add Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    (window as GTagWindow).dataLayer = (window as GTagWindow).dataLayer || [];
    function gtag(...args: unknown[]) {
      (window as GTagWindow).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
    
    // Make gtag globally available
    (window as GTagWindow).gtag = gtag;
    
    return true;
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error);
    return false;
  }
};

// Track page views
export const pageview = (url: string): void => {
  if (!isGAAvailable()) return;
  
  try {
    (window as GTagWindow).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  } catch (error) {
    console.error('Failed to track pageview:', error);
  }
};

// Track events
export const event = (props: EventProps): void => {
  if (!isGAAvailable()) return;
  
  try {
    const { action, category, label, value, nonInteraction = false, ...rest } = props;
    
    (window as GTagWindow).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction: nonInteraction,
      ...rest
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

// Track exceptions/errors
export const exception = (description: string, fatal = false): void => {
  if (!isGAAvailable()) return;
  
  try {
    (window as GTagWindow).gtag('event', 'exception', {
      description,
      fatal
    });
  } catch (error) {
    console.error('Failed to track exception:', error);
  }
};

// Enhanced ecommerce tracking
export const ecommerce = {
  // Track a product view
  viewProduct: (product: { [key: string]: string | number | boolean | undefined }): void => {
    if (!isGAAvailable()) return;
    
    try {
      (window as GTagWindow).gtag('event', 'view_item', {
        items: [product]
      });
    } catch (error) {
      console.error('Failed to track product view:', error);
    }
  },
  
  // Track adding a product to cart
  addToCart: (product: { [key: string]: string | number | boolean | undefined }): void => {
    if (!isGAAvailable()) return;
    
    try {
      (window as GTagWindow).gtag('event', 'add_to_cart', {
        items: [product]
      });
    } catch (error) {
      console.error('Failed to track add to cart:', error);
    }
  },
  
  // Track beginning checkout
  beginCheckout: (products: { [key: string]: string | number | boolean | undefined }[]): void => {
    if (!isGAAvailable()) return;
    
    try {
      (window as GTagWindow).gtag('event', 'begin_checkout', {
        items: products
      });
    } catch (error) {
      console.error('Failed to track begin checkout:', error);
    }
  },
  
  // Track purchase completed
  purchase: (transaction: { [key: string]: string | number | boolean | undefined }): void => {
    if (!isGAAvailable()) return;
    
    try {
      (window as GTagWindow).gtag('event', 'purchase', transaction);
    } catch (error) {
      console.error('Failed to track purchase:', error);
    }
  }
};

// Common event tracking functions
export const trackFormView = (formName: string, source: string): void => {
  event({
    action: 'form_view',
    category: 'Forms',
    label: formName,
    source,
  });
};

export const trackFormSubmission = (formName: string, status: 'success' | 'failure', data: { [key: string]: string | number | boolean | undefined } = {}): void => {
  event({
    action: 'form_submission',
    category: 'Forms',
    label: `${formName} - ${status}`,
    ...data,
  });
};

export const trackButtonClick = (buttonName: string, location: string): void => {
  event({
    action: 'button_click',
    category: 'Engagement',
    label: buttonName,
    location,
  });
};

export const trackCheckoutStart = (amount: number, productName: string): void => {
  event({
    action: 'begin_checkout',
    category: 'Ecommerce',
    label: productName,
    value: amount,
  });
};

export const trackPurchase = (amount: number, productName: string, transactionId: string): void => {
  event({
    action: 'purchase',
    category: 'Ecommerce',
    label: productName,
    value: amount,
    transaction_id: transactionId,
  });
};

// Declare global gtag function
declare global {
  interface Window {
    gtag: (
      command: string,
      action: any,
      params?: any
    ) => void;
    dataLayer: any[];
  }
}
