import { UserID } from '@/core/models/ids/id';
import { UserBook } from '@/core/models/userBook';
import { userBookRepo } from '@/core/repo';

export async function loadUserBooks(userId: UserID): Promise<UserBook[]> {
  return userBookRepo.getByUser(userId);
}
