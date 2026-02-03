import { Collection } from '@/core/models/collection';
import { CollectionID, ShelfID } from '@/core/models/ids/id';

export class MemoryCollectionRepo {
  private collections = new Map<CollectionID, Collection>();

  async get(id: CollectionID) {
    return this.collections.get(id);
  }

  async getAll() {
    return Array.from(this.collections.values());
  }

  async insert(collection: Collection) {
    this.collections.set(collection.id, collection);
  }

  async update(collection: Collection) {
    this.collections.set(collection.id, collection);
  }

  async delete(id: CollectionID) {
    this.collections.delete(id);
  }

  async getByShelf(shelfId: ShelfID) {
    return Array.from(this.collections.values()).filter(
      (c) => c.shelfId === shelfId
    );
  }
}
