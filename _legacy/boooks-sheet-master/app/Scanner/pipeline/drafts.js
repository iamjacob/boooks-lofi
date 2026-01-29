// /pipeline/drafts.js
export async function createDraft({ draftsStore, crops, identity }) {
  const id = `draft_${crypto.randomUUID()}`;

  const spineUrl = crops.spine ? crops.spine.toDataURL("image/webp", 0.9) : null;
  const frontUrl = crops.front ? crops.front.toDataURL("image/webp", 0.9) : null;
  const backUrl = crops.back ? crops.back.toDataURL("image/webp", 0.9) : null;

  const draft = {
    id,
    createdAt: Date.now(),
    images: { spineUrl, frontUrl, backUrl },
    identityHints: identity?.signals ?? null,
    confidence: identity?.confidence ?? 0,
    status: "draft",
  };

  await draftsStore.put(draft);
  return draft;
}
