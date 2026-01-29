export const createBookPress = () => ({
  // ─────────────────────────────────────────────
  // Identity & lifecycle
  // ─────────────────────────────────────────────
  parentId: null,
  childId:null,
  id: null, // uuid / hash
  status: "draft", 
  // draft | scanned | enriched | verified | committed

  createdAt: Date.now(),
  updatedAt: Date.now(),

  source: {
    manual: false,
    visual: false,
    ai: false,
    imported: false, // Google Books, ISBN DB, etc.
  },

  // ─────────────────────────────────────────────
  // Title & authorship
  // ─────────────────────────────────────────────
  title: {
    value: "",
    confidence: 0,
    source: null, // manual | ocr | ai | isbn
  },

  subtitle: {
    value: "",
    confidence: 0,
    source: null,
  },

  authors: [
    {
      name: "",
      role: "author", // author | editor | translator
      confidence: 0,
      source: null,
    }
  ],

  language: {
    value: "",
    confidence: 0,
    source: null,
  },

  // ─────────────────────────────────────────────
  // Identifiers
  // ─────────────────────────────────────────────
  identifiers: {
    isbn10: { value: "", confidence: 0, source: null },
    isbn13: { value: "", confidence: 0, source: null },
    other: [] // ASIN, internal IDs, etc.
  },

  // ─────────────────────────────────────────────
  // Physical book data
  // ─────────────────────────────────────────────
  physical: {
    format: {
      value: "", // hardcover | paperback | spiral | dust_jacket
      confidence: 0,
      source: null,
    },

    dimensions: {
      width:  { value: null, unit: "mm", confidence: 0 },
      height: { value: null, unit: "mm", confidence: 0 },
      depth:  { value: null, unit: "mm", confidence: 0 },
      weight: { value: null, unit: "g",  confidence: 0 },
    },

    pageCount: {
      value: null,
      confidence: 0,
      source: null,
    },
  },

  // ─────────────────────────────────────────────
  // Visual assets (scanner-first)
  // ─────────────────────────────────────────────
  visuals: {
    frontCover: {
      images: [], // raw images
      cropped: null,
      confidence: 0,
    },
    spine: {
      images: [],
      cropped: null,
      confidence: 0,
    },
    backCover: {
      images: [],
      cropped: null,
      confidence: 0,
    },
    pages: {
      samples: [], // intro, index, notes
      ocrText: "",
    },
  },

  // ─────────────────────────────────────────────
  // OCR & CV results
  // ─────────────────────────────────────────────
  vision: {
    detectedLabels: [], // book_spine, book_front, etc.
    textBlocks: [],
    polygons: [],
    shelfContext: null,
  },

  // ─────────────────────────────────────────────
  // Content metadata
  // ─────────────────────────────────────────────
  content: {
    description: {
      value: "",
      confidence: 0,
      source: null,
    },

    subjects: [], // tags / genres
    keywords: [],
    tocDetected: false,
    indexDetected: false,
    notesDetected: false,
  },

  // ─────────────────────────────────────────────
  // Publishing info
  // ─────────────────────────────────────────────
  publishing: {
    publisher: {
      value: "",
      confidence: 0,
      source: null,
    },
    publishedYear: {
      value: null,
      confidence: 0,
      source: null,
    },
    edition: "",
    country: "",
  },

  // ─────────────────────────────────────────────
  // Confidence & ranking
  // ─────────────────────────────────────────────
  confidenceScore: 0, // global score (0–1)

  // ─────────────────────────────────────────────
  // Human & AI annotations
  // ─────────────────────────────────────────────
  annotations: {
    aiNotes: [],
    humanNotes: [],
    conflicts: [],
  },

  // ─────────────────────────────────────────────
  // Provenance & audit trail
  // ─────────────────────────────────────────────
  history: [
    // { field, oldValue, newValue, source, timestamp }
  ],
});
