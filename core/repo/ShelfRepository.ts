import { Shelf } from '@/core/models/shelf';
import { ShelfID, UserID } from '@/core/ids/id';

export interface ShelfRepository {
  get(id: ShelfID): Promise<Shelf | undefined>;
  getByOwner(userId: UserID): Promise<Shelf[]>;
  insert(shelf: Shelf): Promise<void>;
  update(shelf: Shelf): Promise<void>;
  delete(id: ShelfID): Promise<void>;
  
}
