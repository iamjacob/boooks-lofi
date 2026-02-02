import { ShelfInstance } from '@/core/models/shelfInstance';
import { ShelfInstanceID, UserBookID, ShelfID } from '@/core/ids/id';

export class MemoryShelfInstanceRepo {
  private instances = new Map<ShelfInstanceID, ShelfInstance>();

  async get(id: ShelfInstanceID) {
    return this.instances.get(id);
  }

  async insert(instance: ShelfInstance) {
    this.instances.set(instance.id, instance);
  }

  async update(instance: ShelfInstance) {
    this.instances.set(instance.id, instance);
  }

  async delete(id: ShelfInstanceID) {
    this.instances.delete(id);
  }

  async findByUserBook(userBookId: UserBookID) {
    return Array.from(this.instances.values()).find(
      i => i.userBookId === userBookId
    );
  }

  async getAll() {
  return Array.from(this.instances.values());
}

  async getByShelf(shelfId: string) {
    return Array.from(this.instances.values()).filter(
      i => i.shelfId === shelfId
    );
  }
}
