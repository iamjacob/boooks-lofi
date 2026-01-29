// core/models/category.ts
import { ID } from '@/core/ids/id';

export interface Category {
  id: ID;
  label: string;

  parentId?: ID; // for hierarchy

  createdAt: number;
}
