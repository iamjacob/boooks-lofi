// /ml/models/registry.js
import * as tf from "@tensorflow/tfjs";

const cache = new Map();

export function createModelRegistry() {
  async function loadGraphModel(url) {
    if (cache.has(url)) return cache.get(url);

    const model = await tf.loadGraphModel(url);
    cache.set(url, model);
    return model;
  }

  return {
    async get(id) {
      // Map model ids to paths
      switch (id) {
        case "bookPresence":
          return loadGraphModel("/ml/models/bookPresence/model.json");
        case "spineOBB":
          return loadGraphModel("/ml/models/spineOBB/model.json");
        case "cover":
          return loadGraphModel("/ml/models/cover/model.json");
        default:
          throw new Error(`Unknown model id: ${id}`);
      }
    },
    clear() {
      for (const m of cache.values()) m.dispose?.();
      cache.clear();
    },
  };
}
