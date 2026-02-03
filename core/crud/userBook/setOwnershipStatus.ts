import { UserBookID } from '@/core/models/ids/id';
import { userBookRepo } from '@/core/repo';
import { OwnershipStatus } from '@/core/models/userBook';

export async function setOwnershipStatus(
  userBookId: UserBookID,
  ownership: OwnershipStatus
) {
  const userBook = await userBookRepo.get(userBookId);
  if (!userBook) {
    throw new Error('UserBook not found');
  }

  const updated = {
    ...userBook,
    ownershipStatus: ownership,
    updatedAt: Date.now(),
  };

  await userBookRepo.update(updated);
  return updated;
}
