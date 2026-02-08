const CACHE_KEY = "dashboard-data";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

let memoryCache: any = null;

const DASHBOARD_URL =
  "https://script.google.com/macros/s/AKfycbzE3jVybeiMFm23WAJcvPGu8Q23rdnzNwVkpFI3CTfACgGowF45slDyK5AFgTkiY8lI/exec";

export async function getDashboardData() {
  // 1. In-memory cache (fastest)
  if (memoryCache) {
    return memoryCache;
  }

  // 2. localStorage cache
  const stored = localStorage.getItem(CACHE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    if (Date.now() - parsed.timestamp < CACHE_TTL) {
      memoryCache = parsed.data;
      return parsed.data;
    }
  }

  // 3. Fetch from Google Apps Script
  const res = await fetch(DASHBOARD_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const data = await res.json();

  // 4. Save caches
  memoryCache = data;
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      timestamp: Date.now(),
      data
    })
  );

  return data;
}
