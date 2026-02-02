import { Shelf } from '@/core/models/shelf';
import { shelfRepo } from '@/core/repo';
import { createId, UserID } from '@/core/ids/id';

export async function createShelf(input: {
  userId: UserID;
  title: string;
  slug: string;
  visibility: 'private' | 'public';
}): Promise<Shelf> {
  const shelf: Shelf = {
    id: createId<'ShelfID'>(),
    userId: input.userId,
    title: input.title,
    slug: input.slug,
    visibility: input.visibility,
    isSynced: false,
    createdAt: Date.now(),
  };

  await shelfRepo.insert(shelf);
  return shelf;
}
