import { UserRepository } from '../UserRepository';
import { User } from '@/core/models/user';
import { UserID } from '@/core/ids/id';

export class MemoryUserRepo implements UserRepository {
  private users = new Map<UserID, User>();

  async get(id: UserID) {
    return this.users.get(id);
  }

  async getAll() {
    return Array.from(this.users.values());
  }

  async insert(user: User) {
    this.users.set(user.id, user);
  }

  async update(user: User) {
  this.users.set(user.id, user);
}
}
