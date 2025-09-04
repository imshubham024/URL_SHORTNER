const {
  shortenUrl,
  getUrl,
  redirectUrl,
  getStats,
  getTopUrls,
  cleanUpExpiredUrl,
} = require("../services/urlServices.js");

// Shorten a new URL
const shortenUrlController = async (req, res) => {
  try {
    const { url, expirationDays } = req.body;
    const newUrl = await shortenUrl(url, expirationDays);
    const shortUrl = `${req.protocol}://${req.get("host")}/${newUrl.shortCode}`;
    res.status(201).json({
      success: true,
      data: {
        originalUrl: newUrl.orignalUrl,
        shortUrl,
        shortCode: newUrl.shortCode,
        expireAt: newUrl.expiresAt,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get original URL by short code
const getUrlController = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await getUrl(shortCode);
    res.status(200).json({
      success: true,
      data: {
        shortCode: url.shortCode,
        originalUrl: url.orignalUrl,
        createdAt: url.createdAt,
        clicks: url.clicks,
        expireAt: url.expiresAt,
      },
    });
  } catch (err) {
    res.status(err.message === "URL not found" ? 404 : 400).json({
      success: false,
      message: err.message,
    });
  }
};

// Redirect to original URL
const redirectUrlController = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = await redirectUrl(shortCode);
    res.redirect(originalUrl);
  } catch (err) {
    res.status(
      err.message === "URL not found"
        ? 404
        : err.message === "URL has expired"
        ? 401
        : 500
    ).json({
      success: false,
      message: err.message,
    });
  }
};

// Get stats for a URL
const getStatsController = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await getStats(shortCode);
    res.status(200).json({
      success: true,
      data: {
        shortCode: url.shortCode,
        originalUrl: url.orignalUrl,
        createdAt: url.createdAt,
        clicks: url.clicks,
        expireAt: url.expiresAt,
      },
    });
  } catch (err) {
    res.status(err.message === "URL not found" ? 404 : 400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get top 10 most visited URLs
const getTopUrlsController = async (req, res) => {
  try {
    const urls = await getTopUrls();
    res.status(200).json({
      success: true,
      data: urls,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Clean up expired URLs
const cleanUpExpiredUrlController = async (req, res) => {
  try {
    const deletedCount = await cleanUpExpiredUrl();
    res.status(200).json({
      success: true,
      message: `${deletedCount} expired URLs deleted.`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  shortenUrlController,
  getUrlController,
  redirectUrlController,
  getStatsController,
  getTopUrlsController,
  cleanUpExpiredUrlController,
};
