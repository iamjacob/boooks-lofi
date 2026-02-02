import { Book } from '@/core/models/book';
import { ID } from '@/core/ids/id';

export interface BookRepository {
  insert(book: Book): Promise<void>;
  update(book: Book): Promise<void>;
  delete(id: ID): Promise<void>;

  get(id: ID): Promise<Book | undefined>;
  getAll(): Promise<Book[]>;
}
