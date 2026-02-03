import { UserBookRepository } from '../UserBookRepository';
import { UserBook } from '@/core/models/userBook';
import { UserBookID, UserID } from '@/core/models/ids/id';

export class MemoryUserBookRepo implements UserBookRepository {
  private userBooks = new Map<UserBookID, UserBook>();

  async insert(userBook: UserBook) {
    this.userBooks.set(userBook.id, userBook);
  }

  async update(userBook: UserBook) {
    this.userBooks.set(userBook.id, userBook);
  }

  async delete(id: UserBookID) {
    this.userBooks.delete(id);
  }

  async get(id: UserBookID) {
    return this.userBooks.get(id);
  }

  async getAll() {
    return Array.from(this.userBooks.values());
  }

  async getByUser(userId: UserID) {
    return Array.from(this.userBooks.values()).filter(
      ub => ub.userId === userId
    );
  }
}
