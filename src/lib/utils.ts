/**
 * Truncates a given text to a maximum of 40 characters, appending
 * an ellipsis ("...") if the text is longer than 40 characters.
 **/

import { setLocaleCookie } from "./i18n";

export function truncateText(text: string) {
  return text.length > 40 ? text.slice(0, 40) + "..." : text;
}

export function formatDate(date: Date | string, locale: string = "en-US") {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Uploads an image to Cloudinary and returns the secure URL
 * of the uploaded image.
 *
 * @param {File} file The image file to upload
 * @returns {Promise<string>} A promise that resolves to the secure URL of the uploaded image
 */
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

/**
 * Calculates the estimated time to read a given content in minutes.
 * The content is trimmed and split into words to calculate the word count.
 * The read time is then calculated as the maximum of 1 and the ceiling of the word count divided by 200 words per minute.
 * The result is returned as a string in the format "<X> min read".
 */
export const calculateContentLength = (content: string): string => {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE)).toString();
};
