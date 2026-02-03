import { createId } from '@/core/models/ids/id';
import { Shelf } from '@/core/models/shelf';
import { ShelfID, UserID } from '@/core/models/ids/id';
import { shelfRepo } from '@/core/repo';

export async function createShelf(
  ownerId: UserID,
  input: {
    title: string;
    visibility: 'private' | 'public';
  }
): Promise<Shelf> {
  const now = Date.now();

  const shelf: Shelf = {
    id: createId<'ShelfID'>(),
    ownerId,
    title: input.title,
    slug: input.title.toLowerCase().replace(/\s+/g, '-'),
    visibility: input.visibility,
    isSynced: false,
    createdAt: now,
    updatedAt: now,
  };

  await shelfRepo.insert(shelf);
  return shelf;
}
