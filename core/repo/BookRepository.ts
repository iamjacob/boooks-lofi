import { Book } from '@/core/models/book';
import { BookID } from '@/core/ids/id';

export interface BookRepository {
  get(id: BookID): Promise<Book | undefined>;
  getAll(): Promise<Book[]>;
  insert(book: Book): Promise<void>;
  update(book: Book): Promise<void>;
  delete(id: BookID): Promise<void>;
}
