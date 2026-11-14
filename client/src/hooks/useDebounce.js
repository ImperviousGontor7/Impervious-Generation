import { useEffect, useState } from "react";

/**
 * Menunda perubahan value sampai user berhenti
 * melakukan perubahan selama `delay` milidetik.
 *
 * @param {*} value
 * @param {number} delay
 * @returns {*}
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] =
    useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}