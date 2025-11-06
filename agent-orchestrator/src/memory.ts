import type { MemoryItem, MemoryStore } from './types';

export function makeMemory(): MemoryStore {
  const items: MemoryItem[] = [];
  return {
    async put(item) { items.push(item); },
    async search(query: string, k = 5) {
      const q = query.toLowerCase();
      return items
        .map(i => ({ i, score: (i.content.toLowerCase().includes(q) ? 1 : 0) + ((i.tags||[]).some(t => t.toLowerCase().includes(q)) ? 0.5 : 0) }))
        .filter(x => x.score > 0)
        .sort((a,b) => b.score - a.score)
        .slice(0, k)
        .map(x => x.i);
    }
  };
}

