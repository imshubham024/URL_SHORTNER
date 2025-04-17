const {
  shortenUrl,
  getUrl,
  redirectUrl,
  getStats,
  getTopUrls,
  cleanUpExpiredUrl,
} = require("../services/urlServices.js");

const ShoterUrl = async (req, res) => {
  try {
    const { url, expirationDays } = req.body;
    const newUrl = await ShoterUrl(url, expirationDays);
    const shortUrl = `${req.protocol}://${req.get("host")}/${newUrl.ShoterUrl}`;
    res.status(201).json({
      success: true,
      data: {
        orignalUrl: newUrl.orignalUrl,
        shortUrl,
        shortcode: newUrl.shortUrl,
        expireAt: newUrl.expireAt,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// redirect to orignal url
const redirectToUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const orignalUrl = await redirectUrl(shortCode);
    res.redirect(orignalUrl);
  } catch (err) {
    res
      .status(
        err.message === "Url Not Found"
          ? 404
          : err.message === "Url has expired"
          ? 401
          : 500
      )
      .json({
        success: false,
        message: error.message,
      });
  }
};

// get the stat of Url
const getUrlStats = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await getStats(shortCode);
    res.status(200).json({
      success: true,
      data: {
        shortCode: url.shortCode,
        orignalUrl: url.orignalUrl,
        createdAt: url.createdAt,
        clicks: url.clicks,
        expireAt: url.expiresAt,
      },
    });
  } catch (err) {
    res.status(err.message==='URL not found' ?404 :500).json({
      success: false,
      message: err.message,
    });
  }
};
