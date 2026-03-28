/** Truncates text to 40 characters with ellipsis */
export function truncateText(text: string) {
  return text.length > 40 ? text.slice(0, 40) + "..." : text;
}

/** Formats a Date or ISO string into a human-readable date (e.g. "Mar 12, 2026") */
export function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
