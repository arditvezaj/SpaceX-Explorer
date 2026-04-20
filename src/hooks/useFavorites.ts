"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "spacex-favorites";

class FavoritesStore {
  private ids: string[] = [];
  private hydrated = false;
  private subscribers = new Set<() => void>();
  private static readonly EMPTY: string[] = [];

  subscribe = (cb: () => void) => {
    this.subscribers.add(cb);
    if (!this.hydrated) {
      this.hydrated = true;
      const ids = this.loadFromStorage();
      if (ids.length > 0) {
        this.ids = ids;

        Promise.resolve().then(() => this.subscribers.forEach((c) => c()));
      }
    }
    return () => this.subscribers.delete(cb);
  };

  getSnapshot = () => this.ids;

  getServerSnapshot = () => FavoritesStore.EMPTY;

  toggle(id: string) {
    const next = this.ids.includes(id)
      ? this.ids.filter((f) => f !== id)
      : [...this.ids, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    this.ids = next;
    this.subscribers.forEach((cb) => cb());
  }

  private loadFromStorage(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as unknown;
        if (Array.isArray(parsed)) return parsed as string[];
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    return [];
  }
}

const store = new FavoritesStore();

export const useFavorites = () => {
  const favoriteIds = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  const toggleFavorite = (id: string) => store.toggle(id);
  const isFavorite = (id: string) => favoriteIds.includes(id);

  return { favoriteIds, toggleFavorite, isFavorite };
};
