// core/bootstrap/types.ts
import { Device } from '@/core/models/identity/device';
import { User } from '@/core/models/user';

export interface BootstrapResult {
  device: Device;
  users: User[];
  activeUserId: string;
}
