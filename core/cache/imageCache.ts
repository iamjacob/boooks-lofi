// core/cache/imageCache.ts
export type CacheImageInput = {
  file: File;
  bookId: string;
  side: "front" | "spine" | "back";
};

export type CacheImageResult = {
  xs: string;
  small: string;
  medium: string;
  large: string;
};

export async function cacheBookImage(
  input: CacheImageInput
): Promise<CacheImageResult> {
  // senere:
  // - resize
  // - webp
  // - checksum
  // - IndexedDB / FS / CDN
  // - ML hooks

  return {
    xs: "cache://books/123/front-xs.webp",
    small: "cache://books/123/front-small.webp",
    medium: "cache://books/123/front-medium.webp",
    large: "cache://books/123/front-large.webp",
  };
}
