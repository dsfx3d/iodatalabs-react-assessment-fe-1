import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for debouncing values
 * 
 * This hook delays the update of a value until after a specified delay period
 * has passed since the last change. This is useful for preventing excessive
 * API calls during user input, such as real-time search functionality.
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - The delay in milliseconds (default: 300ms)
 * @returns {any} - The debounced value
 * 
 * Example usage:
 * ```javascript
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search API call
 *     performSearch(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
export const useDebounce = (value, delay = 300) => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  const debounceRef = useRef(null);

  useEffect(() => {
    // TODO: Implement debouncing logic
    // 1. Set up a timer that will update debouncedValue after the delay
    // 2. Clear the previous timer if the value changes before the delay expires
    // 3. Return a cleanup function to clear the timer when the component unmounts

    // Hint: Use setTimeout and clearTimeout
    // Remember to handle the cleanup to prevent memory leaks

    debounceRef.current = setTimeout(() => {
      console.log('useDebounce: Setting up debounce for value:', value);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }


    // Placeholder implementation - replace with actual debouncing logic

  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
