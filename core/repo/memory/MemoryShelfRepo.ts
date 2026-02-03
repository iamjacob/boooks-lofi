import { Shelf } from '@/core/models/shelf';
import { ShelfID, UserID } from '@/core/models/ids/id';

export class MemoryShelfRepo {
  private shelves = new Map<ShelfID, Shelf>();

  async get(id: ShelfID) {
    return this.shelves.get(id);
  }

  async getAll() {
    return Array.from(this.shelves.values());
  }

  async insert(shelf: Shelf) {
    this.shelves.set(shelf.id, shelf);
  }

  async update(shelf: Shelf) {
    this.shelves.set(shelf.id, shelf);
  }

  async delete(id: ShelfID) {
    this.shelves.delete(id);
  }

  async getByOwner(userId: UserID) {
  return Array.from(this.shelves.values()).filter(
    s => s.ownerId === userId
  );
}

}
