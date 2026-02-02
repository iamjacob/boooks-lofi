import { UserBookRepository } from '../UserBookRepository';
import { UserBook } from '@/core/models/userBook';
import { ID } from '@/core/ids/id';

export class MemoryUserBookRepo implements UserBookRepository {
  private userBooks = new Map<ID, UserBook>();

  async insert(userBook: UserBook) {
    this.userBooks.set(userBook.id, userBook);
  }

  async update(userBook: UserBook) {
    this.userBooks.set(userBook.id, userBook);
  }

  async delete(id: ID) {
    this.userBooks.delete(id);
  }

  async get(id: ID) {
    return this.userBooks.get(id);
  }

  async getAll() {
    return Array.from(this.userBooks.values());
  }

  async getByUser(userId: ID) {
    return Array.from(this.userBooks.values()).filter(
      ub => ub.userId === userId
    );
  }
}
