/**
 * Helper function to generate canonical URLs for each page
 * This prevents issues with conflicting redirects
 */
type CanonicalOptions = {
  path?: string;
  query?: Record<string, string>;
};

/**
 * Generates canonical URLs for each page
 * 
 * @param options Options for generating the canonical URL
 * @returns Fully qualified canonical URL
 */
export function generateCanonicalUrl(options: CanonicalOptions = {}): string {
  const { path = '', query = {} } = options;
  
  // Use the production URL as base
  const baseUrl = 'https://vitalpredict.dev';
  
  // Clean the path to ensure it starts with / but doesn't have a trailing slash
  const cleanPath = path 
    ? (path.startsWith('/') ? path : `/${path}`)
    : '';
    
  // Build the query string if there are query parameters
  const queryString = Object.keys(query).length 
    ? `?${new URLSearchParams(query).toString()}` 
    : '';
    
  // Return the complete URL
  return `${baseUrl}${cleanPath}${queryString}`;
}
