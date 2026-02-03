import { UserID } from '@/core/models/ids/id';
import { userRepo } from '@/core/repo';
import { ThemePreference } from '@/core/models/user';

export async function setTheme(
  userId: UserID,
  theme: ThemePreference
) {
  const user = await userRepo.get(userId);
  if (!user) throw new Error('User not found');

  const updated = {
    ...user,
    theme,
    updatedAt: Date.now(),
  };

  await userRepo.update(updated);
  return updated;
}
