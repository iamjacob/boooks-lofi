import { UserBook } from '@/core/models/userBook';
import { userBookRepo } from '@/core/repo';

export async function updateUserBook(userBook: UserBook) {
  await userBookRepo.update(userBook);
  return userBook;
}
