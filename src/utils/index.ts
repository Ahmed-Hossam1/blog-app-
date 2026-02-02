export function truncateText(text: string) {
  return text.length > 40 ? text.slice(0, 40) + "..." : text;
}
