import { UserBookID } from '@/core/ids/id';
import { userBookRepo } from '@/core/repo';
import { IntentStatus } from '@/core/models/userBook';

export async function setIntentStatus(
  userBookId: UserBookID,
  intent: IntentStatus
) {
  const userBook = await userBookRepo.get(userBookId);
  if (!userBook) {
    throw new Error('UserBook not found');
  }

  const updated = {
    ...userBook,
    intentStatus: intent,
    updatedAt: Date.now(),
  };

  await userBookRepo.update(updated);
  return updated;
}
