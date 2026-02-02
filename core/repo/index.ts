import { MemoryUserRepo } from './memory/MemoryUserRepo';
import { MemoryBookRepo } from './memory/MemoryBookRepo';
import { MemoryAuthorRepo } from './memory/MemoryAuthorRepo';
import { MemoryUserBookRepo } from './memory/MemoryUserBookRepo';
import { MemoryShelfRepo } from './memory/MemoryShelfRepo';
import { MemoryShelfInstanceRepo } from './memory/MemoryShelfInstanceRepo';

export const userRepo = new MemoryUserRepo();
export const bookRepo = new MemoryBookRepo();
export const authorRepo = new MemoryAuthorRepo();
export const userBookRepo = new MemoryUserBookRepo();
export const shelfRepo = new MemoryShelfRepo();
export const shelfInstanceRepo = new MemoryShelfInstanceRepo();
