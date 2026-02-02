import { Author } from '@/core/models/author';
import { AuthorID } from '@/core/ids/id';

export interface AuthorRepository {
  get(id: AuthorID): Promise<Author | undefined>;
  getAll(): Promise<Author[]>;
  insert(author: Author): Promise<void>;
  update(author: Author): Promise<void>;
  delete(id: AuthorID): Promise<void>;
}
