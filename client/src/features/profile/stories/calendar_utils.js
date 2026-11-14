export function getMonthName(month) {
  return new Date(2026, month).toLocaleString("en-US", {
    month: "long",
  });
}

export function getMonthDays(year, month) {
  const total = new Date(year, month + 1, 0).getDate();

  return Array.from(
    { length: total },
    (_, i) => i + 1
  );
}