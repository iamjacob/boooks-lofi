// /pipeline/verify.js

export async function maybeVerifyDraft({ draft, context }) {
  // v1: simple rule (you’ll upgrade)
  const ok = (draft.identity?.confidence ?? 0) >= 0.85;
  if (!ok) return { verified: false, reason: "low-confidence" };

  return {
    verified: true,
    verifiedAt: Date.now(),
    book: draft.identity.best,
  };
}
