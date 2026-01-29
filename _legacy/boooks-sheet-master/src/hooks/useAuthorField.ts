import { useAuthorsStore } from "@stores/useAuthorsStore";
import type { Author } from "@models/author";

export function useAuthorField<T>(
  authorId: string,
  selector: (author: Author | undefined) => T,
  equalityFn: (a: T, b: T) => boolean = Object.is
) {
  return useAuthorsStore(
    (state) => selector(state.authors[authorId]),
    equalityFn
  );
}
