import { User } from '@/core/models/user';
import { userRepo } from '@/core/repo';

export async function updateUser(user: User) {
  const updated = {
    ...user,
    updatedAt: Date.now(),
  };

  await userRepo.update(updated);
  return updated;
}
