import { Shelf } from '@/core/models/shelf';
import { ShelfID } from '@/core/ids/id';

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
}
