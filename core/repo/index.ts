import { MemoryUserRepo } from './memory/MemoryUserRepo';
import { MemoryBookRepo } from './memory/MemoryBookRepo';
import { MemoryAuthorRepo } from './memory/MemoryAuthorRepo';
import { MemoryUserBookRepo } from './memory/MemoryUserBookRepo';
import { MemoryShelfRepo } from './memory/MemoryShelfRepo';
import { MemoryShelfInstanceRepo } from './memory/MemoryShelfInstanceRepo';
import { MemoryLibraryGroupRepo } from './memory/MemoryLibraryGroupRepo';
import { MemoryShelfGroupRepo } from './memory/MemoryShelfGroupRepo';
import { MemoryCollectionRepo } from './memory/MemoryCollectionRepo';
import { MemoryCollectionItemRepo } from './memory/MemoryCollectionItemRepo';

export const userRepo = new MemoryUserRepo();
export const bookRepo = new MemoryBookRepo();
export const authorRepo = new MemoryAuthorRepo();
export const userBookRepo = new MemoryUserBookRepo();
export const shelfRepo = new MemoryShelfRepo();
export const shelfInstanceRepo = new MemoryShelfInstanceRepo();
export const libraryGroupRepo = new MemoryLibraryGroupRepo();
export const shelfGroupRepo = new MemoryShelfGroupRepo();
export const collectionRepo = new MemoryCollectionRepo();
export const collectionItemRepo = new MemoryCollectionItemRepo();

