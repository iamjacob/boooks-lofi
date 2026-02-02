import { UserBook } from '@/core/models/userBook';
import { ID } from '@/core/ids/id';

export interface UserBookRepository {
  insert(userBook: UserBook): Promise<void>;
  update(userBook: UserBook): Promise<void>;
  delete(id: ID): Promise<void>;

  get(id: ID): Promise<UserBook | undefined>;
  getAll(): Promise<UserBook[]>;

  getByUser(userId: ID): Promise<UserBook[]>;
}
