/**
 * Smoothly scrolls to the specified element with an offset for the navbar
 * @param elementId - The ID of the element to scroll to
 * @param offset - Offset from the top (to account for fixed navbar)
 */
export const scrollToElement = (elementId: string, offset: number = 80) => {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Handles click events for navigation links
 * @param e - The click event
 * @param href - The href attribute of the link
 * @param callback - Optional callback to execute after scrolling (e.g., close mobile menu)
 */
export const handleNavLinkClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  callback?: () => void
) => {
  e.preventDefault();
  
  if (href.startsWith('#')) {
    const elementId = href.substring(1); // Remove the # character
    scrollToElement(elementId);
  } else {
    window.location.href = href;
  }
  
  if (callback) {
    callback();
  }
};
