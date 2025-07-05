interface CacheItem<T> {
  data: T
  timestamp: number
  expiresAt: number
}

class DataCache {
  private cache = new Map<string, CacheItem<any>>()
  private readonly CACHE_DURATION = 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds

  set<T>(key: string, data: T, customDuration?: number): void {
    const now = Date.now()
    const duration = customDuration || this.CACHE_DURATION

    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + duration,
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)

    if (!item) {
      return null
    }

    // Check if cache has expired
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key)
    } else {
      this.cache.clear()
    }
  }

  getStats() {
    const now = Date.now()
    const items = Array.from(this.cache.entries())

    return {
      totalItems: items.length,
      activeItems: items.filter(([_, item]) => now <= item.expiresAt).length,
      expiredItems: items.filter(([_, item]) => now > item.expiresAt).length,
      cacheKeys: items.map(([key]) => key),
    }
  }
}

export const dataCache = new DataCache()
