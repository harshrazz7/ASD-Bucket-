const cache = {};
const TTL_MS = 60 * 1000; // 1 minute TTL

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  const cachedData = cache[key];

  if (cachedData) {
    const isExpired = (Date.now() - cachedData.timestamp) > TTL_MS;

    if (!isExpired) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cachedData.data);
    } else {
      // TTL expired, invalidate entry
      delete cache[key];
    }
  }

  res.setHeader('X-Cache', 'MISS');

  // Override res.json to cache response data with timestamp
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache[key] = {
        data: body,
        timestamp: Date.now()
      };
    }
    return originalJson(body);
  };

  next();
}

function invalidateCache() {
  for (const key in cache) {
    delete cache[key];
  }
}

module.exports = { cacheMiddleware, invalidateCache };