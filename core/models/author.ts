import { ID } from '@/core/ids/id';

export interface Author {
  id: ID;
  name: string;

  bio?: string;
  avatarUrl?: string;

  createdAt: number;
}
