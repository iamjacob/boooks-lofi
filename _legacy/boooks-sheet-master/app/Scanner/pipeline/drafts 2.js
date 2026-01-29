// /pipeline/drafts.js

export async function upsertDraft({ context, frame, parts, crops, identity, mode }) {
  // v1: return object; later store in pglite / indexeddb / server
  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    mode,
    context,
    frame: { blobUrl: frame.blobUrl, w: frame.width, h: frame.height },
    parts,
    crops: {
      front: crops.front?.blobUrl || null,
      spine: crops.spine?.blobUrl || null,
      back: crops.back?.blobUrl || null,
    },
    identity,
    status: "draft",
  };
}
