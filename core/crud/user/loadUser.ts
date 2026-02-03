import { UserID } from '@/core/ids/id';
import { userRepo } from '@/core/repo';

export async function loadUser(userId: UserID) {
  return userRepo.get(userId);
}
