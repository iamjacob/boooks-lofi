import { UserID } from '@/core/ids/id';
import { userRepo } from '@/core/repo';

export async function deleteUser(userId: UserID) {
  await userRepo.delete(userId);
}
