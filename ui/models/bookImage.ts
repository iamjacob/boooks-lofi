// ui/models/bookImage.ts

export type ImageSize = "xs" | "small" | "medium" | "large";

/**
 * Known surface roles (not exhaustive)
 * — can be extended without refactor
 */
export type BookImageRole =
  | "cover.front"
  | "cover.spine"
  | "cover.back"
  | "jacket.front"
  | "jacket.spine"
  | "jacket.back"
  | "jacket.flap.front"
  | "jacket.flap.back"
  | "custom";

/**
 * One image variant (LOD)
 */
export type BookImageVariant = {
  size: ImageSize;
  uri: string;          // cache://, blob://, https://
  width?: number;
  height?: number;
};

/**
 * All images grouped by role
 */
export type BookImageSet = {
  [role: string]: Partial<Record<ImageSize, BookImageVariant>>;
};
