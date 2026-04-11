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

  export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`/api/upload`, { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    // The upload API returns { url: <Cloudinary result object> }
    // The Cloudinary result contains `.secure_url`
    return data.url?.secure_url as string;
  };