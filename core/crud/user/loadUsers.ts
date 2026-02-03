import { userRepo } from '@/core/repo';

export async function loadUsers() {
  return userRepo.getAll();
}
