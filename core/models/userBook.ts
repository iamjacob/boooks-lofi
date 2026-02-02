import { ID } from "@/core/ids/id";

export type ReadingStatus =
  | "inspiration"
  | "unread"
  | "reading"
  | "finished"
  | "paused"
  | "abandoned";

export type OwnershipStatus =
  | "owned"        // jeg ejer den fysisk/digitalt
  | "borrowed"     // jeg har lånt den
  | "lent"         // jeg har lånt den ud
  | "needed"       // jeg mangler adgang (fx skolebog)
  | "none";        // ingen fysisk relation

  export type IntentStatus =
  | "wish"   // jeg vil gerne læse den (Your active intent)
  | "advocate"  // jeg ønsker andre læser den (You promote/recommend it)
  | "bestow"    // jeg vil give den væk fysisk (To present as a gift)
  | "acquire";  // jeg ønsker en anden giver/låner mig den (To seek/obtain)

export interface UserBook {
  id: ID;

  /** Ownership */
  userId: ID;
  bookId: ID;

  /** Personal state */
  readingStatus: ReadingStatus;
  ownershipStatus?: OwnershipStatus;
  intentStatus?: IntentStatus;

  // Library-only grouping (NOT a movable group)
  libraryGroupId?: ID; // fx "harry-potter-series"


  tagIds?: ID[];
  syncState: "local" | "pending" | "synced" | "error";

  /** Optional 3D placement (future) */
  libraryPlacement?: {
    position: [number, number, number];
    rotation: [number, number, number];
  };

  /** Ownership / rights (future) */
  ownership?: {
    type: "local" | "license" | "nft" | "donation";
    ownerIdentityId?: ID;
    chain?: string;
    tokenId?: string;
  };

  commitState?: "draft" | "pending" | "committed";
 //something to auto update/append to mempool

  isSynced?:boolean;
  lastSyncedAt?: number;
  createdAt: number;
  updatedAt?: number;
}
