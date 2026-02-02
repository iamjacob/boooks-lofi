import { UserBook } from '@/core/models/userBook';
import { UserBookID, UserID } from '@/core/ids/id';

export interface UserBookRepository {
  get(id: UserBookID): Promise<UserBook | undefined>;
  getByUser(userId: UserID): Promise<UserBook[]>;
  insert(userBook: UserBook): Promise<void>;
  update(userBook: UserBook): Promise<void>;
  delete(id: UserBookID): Promise<void>;
}
