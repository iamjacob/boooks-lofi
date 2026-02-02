import { MemoryAuthorRepo } from './memory/MemoryAuthorRepo';
import { MemoryBookRepo } from './memory/MemoryBookRepo';
import { MemoryUserBookRepo } from './memory/MemoryUserBookRepo';
import { MemoryUserRepo } from './memory/MemoryUserRepo';

export const authorRepo = new MemoryAuthorRepo();
export const bookRepo = new MemoryBookRepo();
export const userBookRepo = new MemoryUserBookRepo();
export const userRepo = new MemoryUserRepo();
