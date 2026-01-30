// ui/mocks/shelves.mock.ts
import { ID } from "@/core/ids/id";

export type Shelf = {
  id: ID;
  name: string;
};

export const mockShelves: Shelf[] = [
  { id: "default", name: "All books" },
  { id: "reading", name: "Reading" },
  { id: "finished", name: "Finished" },
];
