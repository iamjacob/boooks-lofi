import { User } from '@/core/models/user';
import { UserID } from '@/core/ids/id';

export interface UserRepository {
  get(id: UserID): Promise<User | undefined>;
  getAll(): Promise<User[]>;
  insert(user: User): Promise<void>;
}
