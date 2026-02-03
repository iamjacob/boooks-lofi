import { UserID } from '@/core/models/ids/id';
import { userRepo } from '@/core/repo';

export async function loadUser(userId: UserID) {
  return userRepo.get(userId);
}
