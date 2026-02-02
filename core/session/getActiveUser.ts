import { userRepo } from '@/core/repo';
import { UserID } from '@/core/ids/id';

let activeUserId: UserID | null = null;

export async function setActiveUser(userId: UserID) {
  activeUserId = userId;
}

export async function getActiveUser() {
  if (!activeUserId) {
    throw new Error('No active user');
  }

  const user = await userRepo.get(activeUserId);
  if (!user) {
    throw new Error('Active user not found');
  }

  return user;
}
