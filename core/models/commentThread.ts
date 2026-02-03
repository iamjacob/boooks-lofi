import { CommentThreadID, CommentID, UserID, BookID, ShelfInstanceID, ClipID } from '@/core/models/ids/id';

export interface Comment {
  id: CommentID;
  threadId: CommentThreadID;
  authorId: UserID;

  /** Comment text (supports markdown) */
  text: string;

  /** Threading */
  parentCommentId?: CommentID; // reply to another comment

  /** Moderation */
  isEdited: boolean;
  editedAt?: number;
  isDeleted: boolean;
  deletedAt?: number;

  createdAt: number;
}

export interface CommentThread {
  id: CommentThreadID;

  /** Who initiated the thread */
  createdBy: UserID;

  /** What is being discussed - only ONE of these should be set */
  bookId?: BookID;
  shelfInstanceId?: ShelfInstanceID;
  clipId?: ClipID;

  /** Thread metadata */
  title?: string;
  status: 'open' | 'closed' | 'archived';

  /** Comments */
  comments: Comment[];
  commentCount: number;

  /** Moderation */
  isPinned: boolean;
  isModerationFlag: boolean; // flagged for review

  /** Privacy */
  visibility: 'private' | 'friends' | 'public';

  isSynced: boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
