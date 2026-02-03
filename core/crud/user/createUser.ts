import { User } from '@/core/models/user';
import { UserID } from '@/core/ids/id';
import { userRepo } from '@/core/repo';
import { createId } from '@/core/ids/id';

export async function createUser(input: {
  handle: string;
  displayName?: string;
  mode: 'private' | 'social';
}) {
  const now = Date.now();

  const user: User = {
    id: createId<'UserID'>(),
    handle: input.handle,
    displayName: input.displayName,
    mode: input.mode,
    isSynced: false,
    createdAt: now,
    updatedAt: now,
  };

  await userRepo.insert(user);
  return user;
}
