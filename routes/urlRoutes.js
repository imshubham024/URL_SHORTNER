const express = require("express");
const router = express.Router();
const {
  shortenUrlController,
  getUrlController,
  redirectUrlController,
  getStatsController,
  getTopUrlsController,
  cleanUpExpiredUrlController,
} = require("../controllers/UrlController.js");

// Shorten a new URL
router.post("/shorten", shortenUrlController);

// Get original URL details
router.get("/url/:shortCode", getUrlController);

// Redirect to original URL
router.get("/redirect/:shortCode", redirectUrlController);

// Get stats for a URL
router.get("/stats/:shortCode", getStatsController);

// Get top 10 most visited URLs
router.get("/top", getTopUrlsController);

// Clean up expired URLs
router.delete("/cleanup", cleanUpExpiredUrlController);

module.exports = router;