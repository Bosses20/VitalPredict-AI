// Analytics helper for VitalPredict AI
// This file provides a central place to manage analytics tracking

type EventProps = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  [key: string]: any;
};

// Check if window and Google Analytics objects are available (client-side only)
const isGAAvailable = () => {
  return typeof window !== 'undefined' && 
         typeof window.gtag !== 'undefined';
};

// Initialize Google Analytics
export const initGA = (): boolean => {
  if (isGAAvailable()) return true; // Already initialized
  
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) {
    console.warn('Google Analytics ID not found in environment variables');
    return false;
  }
  
  try {
    // Add Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', gaId, {
      page_path: window.location.pathname,
    });
    
    // Make gtag globally available
    window.gtag = gtag;
    
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
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string, {
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
    
    window.gtag('event', action, {
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
    window.gtag('event', 'exception', {
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
  viewProduct: (product: any): void => {
    if (!isGAAvailable()) return;
    
    try {
      window.gtag('event', 'view_item', {
        items: [product]
      });
    } catch (error) {
      console.error('Failed to track product view:', error);
    }
  },
  
  // Track adding a product to cart
  addToCart: (product: any): void => {
    if (!isGAAvailable()) return;
    
    try {
      window.gtag('event', 'add_to_cart', {
        items: [product]
      });
    } catch (error) {
      console.error('Failed to track add to cart:', error);
    }
  },
  
  // Track beginning checkout
  beginCheckout: (products: any[]): void => {
    if (!isGAAvailable()) return;
    
    try {
      window.gtag('event', 'begin_checkout', {
        items: products
      });
    } catch (error) {
      console.error('Failed to track begin checkout:', error);
    }
  },
  
  // Track purchase completed
  purchase: (transaction: any): void => {
    if (!isGAAvailable()) return;
    
    try {
      window.gtag('event', 'purchase', transaction);
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

export const trackFormSubmission = (formName: string, status: 'success' | 'failure', data: any = {}): void => {
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
