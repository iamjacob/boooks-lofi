import { ShelfInstance } from '@/core/models/shelfInstance';
import { ShelfInstanceID, UserBookID, ShelfID } from '@/core/models/ids/id';

export interface ShelfInstanceRepository {
  get(id: ShelfInstanceID): Promise<ShelfInstance | undefined>;
  findByUserBook(userBookId: UserBookID): Promise<ShelfInstance | undefined>;
  getByShelf(shelfId: ShelfID): Promise<ShelfInstance[]>;
  insert(instance: ShelfInstance): Promise<void>;
  update(instance: ShelfInstance): Promise<void>;
  delete(id: ShelfInstanceID): Promise<void>;
}
