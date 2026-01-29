// Manual

book.title.value = "Meditations"
book.title.source = "manual"
book.title.confidence = 1
book.source.manual = true


// Visual
book.visuals.spine.images.push(image)
book.vision.textBlocks = ocrResults
book.title.source = "ocr"
book.source.visual = true

//AI
book.description.value = aiSummary
book.description.source = "ai"
book.description.confidence = 0.7
book.source.ai = true

//🥇 Layer 1: Deterministic matching (cheap, fast)
matchByISBN(isbn13)
matchByExactTitleAndAuthor(title, author)
matchByPublisherAndYear(publisher, year)

//🥈 Layer 2: Fuzzy / heuristic matching (semi-smart)


confidence = 
  0.4 * titleSimilarity +
  0.3 * authorSimilarity +
  0.2 * isbnPartial +
  0.1 * physicalMatch

  book.annotations.aiNotes.push({
  type: "duplicate_match",
  matchedBookId: "booksBlockchain:123",
  confidence: 0.92,
});

//🥉 Layer 3: ML / embedding matching (expensive, powerful)
// resolveBook(bookPress) => {
//   status: "known" | "new" | "uncertain",
//   matchedId: null | bookId,
// }

//On capture

const crops = captureBookParts();
const identity = await identifyBook(crops);

if (identity.confidence > 0.9) {
  showKnownBook(identity);
} else {
  createDraftBook(crops);
}
