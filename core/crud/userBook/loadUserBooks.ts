import { UserBook } from '@/core/models/userBook';
import { userBookRepo } from '@/core/repo';

export async function loadUserBooks(userId: string): Promise<UserBook[]> {
  return userBookRepo.getByUser(userId);
}
