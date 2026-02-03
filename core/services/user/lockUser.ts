import { StorageAdapter } from '@/core/storage/adapter';
import { storageKeys } from '@/core/storage/keys';
import { User } from '@/core/models/user';
import { hashPin, verifyPin } from '@/_trash_here/security/pin';
import { logEvent } from '@/_trash_here/history/logEvent';

export async function setUserPin(
  adapter: StorageAdapter,
  userId: string,
  pin: string
) {
  const users =
    (await adapter.get<User[]>(storageKeys.users)) ?? [];

  const index = users.findIndex(u => u.id === userId);
  if (index === -1) throw new Error('User not found');

  const pinHash = await hashPin(pin);

  users[index] = {
    ...users[index],
    pinHash,
    updatedAt: Date.now(),
  };

  await adapter.set(storageKeys.users, users);

  await logEvent(adapter, userId, 'user.pin_set');
}

export async function unlockUser(
  adapter: StorageAdapter,
  userId: string,
  pin: string
): Promise<boolean> {
  const users =
    (await adapter.get<User[]>(storageKeys.users)) ?? [];

  const user = users.find(u => u.id === userId);
  if (!user || !user.pinHash) return false;

  const ok = await verifyPin(pin, user.pinHash);

  if (ok) {
    await logEvent(adapter, userId, 'user.unlocked');
  }

  return ok;
}
