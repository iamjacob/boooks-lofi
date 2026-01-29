export type HistoryEventType =
  | 'connectivity.online'
  | 'connectivity.offline'
  | 'connectivity.restored'
  // identity / lifecycle
  | 'USER_CREATED'
  | 'USER_UPDATED'
  
  |'user.logged_out'
  |'session.revoked'

    // clips (quotes, news, notes)
  | 'clip.created'
  | 'clip.updated'
  | 'clip.deleted'


  // books
  | 'BOOK_CREATED'
  | 'BOOK_UPDATED'
  | 'BOOK_SUBMITTED'
  | 'BOOK_VERIFIED'

  // shelves
  | 'SHELF_CREATED'
  | 'SHELF_UPDATED'
  | 'BOOK_ADDED_TO_SHELF'
  | 'BOOK_REMOVED_FROM_SHELF'
  
  | 'shelf_instance.created'

  // collections
  | 'COLLECTION_CREATED'
  | 'COLLECTION_UPDATED'


    // connectivity
  | 'connectivity.online'
  | 'connectivity.offline'
  | 'connectivity.restored'

  // user lifecycle
  | 'user.created'
  | 'user.updated'
  | 'user.switched'
  
  | 'user.pin_set'
  | 'user.locked'
  | 'user.unlocked'


  // shelves
  | 'shelf.created'
  | 'shelf.updated'
  | 'shelf.deleted'

  // clips (quotes, notes, news)
  | 'clip.created'
  | 'clip.updated'
  | 'clip.deleted'

  // books (global entity)
  | 'book.created'
  | 'book.updated'
  | 'book.submitted'
  | 'book.verified'

  // user-book relation
  | 'user_book.added'
  | 'user_book.updated'
  | 'user_book.removed'

  // collections
  | 'collection.created'
  | 'collection.updated'
  | 'collection.deleted'

  // system / sync
  | 'sync.merged'
  | 'sync.conflict'
  | 'system.error';
