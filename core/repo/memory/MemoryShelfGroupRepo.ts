import { ShelfGroup } from '@/core/models/shelfGroup';
import { ShelfGroupID, ShelfID } from '@/core/models/ids/id';

export class MemoryShelfGroupRepo {
  private shelfGroups = new Map<ShelfGroupID, ShelfGroup>();

  async get(id: ShelfGroupID) {
    return this.shelfGroups.get(id);
  }

  async getAll() {
    return Array.from(this.shelfGroups.values());
  }

  async insert(shelfGroup: ShelfGroup) {
    this.shelfGroups.set(shelfGroup.id, shelfGroup);
  }

  async update(shelfGroup: ShelfGroup) {
    this.shelfGroups.set(shelfGroup.id, shelfGroup);
  }

  async delete(id: ShelfGroupID) {
    this.shelfGroups.delete(id);
  }

  async getByShelf(shelfId: ShelfID) {
    return Array.from(this.shelfGroups.values()).filter(
      (sg) => sg.shelfId === shelfId
    );
  }
}
