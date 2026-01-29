// /pipeline/verify.js
export async function maybeVerify({ draft, identity, verifiedStore, localIndex }) {
  // v1 rule: only verify if we have strong ID (like ISBN) or high confidence cover match
  const strong =
    identity?.matchType === "isbn" && identity.confidence >= 0.95;

  if (!strong) {
    return { promoted: false, reason: "Not enough confidence yet" };
  }

  // Promote: create verified record
  const verified = {
    id: identity.book.id, // or isbn-based id
    isbn: identity.book.isbn,
    title: identity.book.title,
    createdAt: Date.now(),
    sources: ["scan"],
  };

  await verifiedStore.put(verified);

  // Update local index (so next scan becomes “known” offline)
  localIndex.putBook({
    ...identity.book,
    id: verified.id,
  });

  return { promoted: true, verified };
}
