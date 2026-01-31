/**
 * Decode username from URL segment.
 * Handles %40jacob -> @jacob -> jacob
 */
export function decodeUsernameFromUrl(raw: string): {
  username: string;
  hasAt: boolean;
} {
  const decoded = decodeURIComponent(raw);

  if (decoded.startsWith("@")) {
    return {
      username: decoded.slice(1),
      hasAt: true,
    };
  }

  return {
    username: decoded,
    hasAt: false,
  };
}

/**
 * Encode username for display / links.
 * Always returns @username
 */
export function encodeUsernameForUrl(username: string): string {
  return `@${encodeURIComponent(username)}`;
}
