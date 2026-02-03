import { UserID } from '@/core/models/ids/id';
import { shelfRepo } from '@/core/repo';

export async function loadShelves(userId: UserID) {
  return shelfRepo.getByOwner(userId);
}
