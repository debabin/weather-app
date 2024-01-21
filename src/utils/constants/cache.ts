class CacheWithTimer {
  private cache: Map<string, { value: any; expiredTime: number }>;

  constructor() {
    this.cache = new Map();
  }

  set<T>(key: string, value: T, duration: number): boolean {
    const exist = !!this.cache.has(key);
    this.cache.set(key, { value, expiredTime: new Date().getTime() + duration });
    return exist;
  }

  get<T>(key: string): T | null {
    const cache = this.cache.get(key);

    if (cache && cache.expiredTime >= new Date().getTime()) {
      return cache.value;
    } else {
      this.cache.delete(key);
      return null;
    }
  }
}

export const cacheWithTimer = new CacheWithTimer();
