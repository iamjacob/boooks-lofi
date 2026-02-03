import { CollectionItem } from '@/core/models/collectionItem';
import { CollectionItemID, CollectionID } from '@/core/ids/id';

export class MemoryCollectionItemRepo {
  private collectionItems = new Map<CollectionItemID, CollectionItem>();

  async get(id: CollectionItemID) {
    return this.collectionItems.get(id);
  }

  async getAll() {
    return Array.from(this.collectionItems.values());
  }

  async insert(collectionItem: CollectionItem) {
    this.collectionItems.set(collectionItem.id, collectionItem);
  }

  async update(collectionItem: CollectionItem) {
    this.collectionItems.set(collectionItem.id, collectionItem);
  }

  async delete(id: CollectionItemID) {
    this.collectionItems.delete(id);
  }

  async getByCollection(collectionId: CollectionID) {
    return Array.from(this.collectionItems.values()).filter(
      (ci) => ci.collectionId === collectionId
    );
  }
}
