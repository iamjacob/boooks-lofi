import { shelfRepo } from '@/core/repo';

export async function loadShelves() {
  return shelfRepo.getAll();
}
