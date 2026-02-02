import { Author } from '@/core/models/author';
import { ID } from '@/core/ids/id';

export interface AuthorRepository {
  insert(author: Author): Promise<void>;
  update(author: Author): Promise<void>;
  delete(id: ID): Promise<void>;

  get(id: ID): Promise<Author | undefined>;
  getAll(): Promise<Author[]>;
}
