import { useState } from "react";

export default function useDualCalendar() {

  const [month, setMonth] = useState(4);
  const year = 2026;

  const next = () => {
    setMonth((m) => (m + 1) % 12);
  };

  const prev = () => {
    setMonth((m) => (m - 1 + 12) % 12);
  };

  return {
    year,
    month,
    next,
    prev,
  };
}