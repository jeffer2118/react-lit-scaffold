export function sanitizeString(str: string): string {
  // Replace spaces with hyphens
  let sanitizedStr = str.replace(/\s+/g, '-');

  // Remove special characters
  sanitizedStr = sanitizedStr.replace(/[^a-zA-Z0-9-]/g, '');

  return sanitizedStr;
}