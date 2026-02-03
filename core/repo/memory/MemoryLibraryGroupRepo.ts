import { LibraryGroup } from '@/core/models/libraryGroup';
import { LibraryGroupID, UserID } from '@/core/models/ids/id';

export class MemoryLibraryGroupRepo {
  private libraryGroups = new Map<LibraryGroupID, LibraryGroup>();

  async get(id: LibraryGroupID) {
    return this.libraryGroups.get(id);
  }

  async getAll() {
    return Array.from(this.libraryGroups.values());
  }

  async insert(libraryGroup: LibraryGroup) {
    this.libraryGroups.set(libraryGroup.id, libraryGroup);
  }

  async update(libraryGroup: LibraryGroup) {
    this.libraryGroups.set(libraryGroup.id, libraryGroup);
  }

  async delete(id: LibraryGroupID) {
    this.libraryGroups.delete(id);
  }

  async getByOwner(userId: UserID) {
    return Array.from(this.libraryGroups.values()).filter(
      (lg) => lg.ownerId === userId
    );
  }
}
