const Url = require("../models/urlModel.js");
const generate = require("../components/ShortCodeGenerator.js");
const URLValidator = require("../components/URLValidator.js");

const generator = new createShortCodeGenerator(7);
const validator = new URLValidator();

const shortenUrl = async (orignalUrl, expirationDays = null) => {
  // validating the given Url
  const validionResult = validator.validate(orignalUrl);
  if (!validionResult.valid) {
    throw new Error(validionResult.message);
  }

  //calculate expiration date if provided
  let expiresAt = null;
  if (expirationDays && !NaN(expirationDays) && expirationDays > 0) {
    expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + parseInt(expirationDays));
  }

  //gernerating unique short url
  let shortCode = generate(orignalUrl);
  let existing = await Url.findOne({ shortCode: shortCode });
  let attempts = 0;
  while (existing && attempts < 10) {
    shortCode = generate(orignalUrl);
    existing = await Url.findOne({ shortCode: shortCode });
    attempts++;
  }
  if (attempts >= 10) {
    throw new Error("Could not generate unique short code");
  }

  //Creating The New Url Oject In The DB
  const newUrl = Url.create({ shortCode, orignalUrl, expiresAt });
  await newUrl.save();
  return newUrl;
};

// geting the created Url
const getUrl = async (shortCode) => {
  //finding the orignal Url in DB based on provided short Url
  const orgUrl = await Url.findOne({ shortCode });
  if (!orgUrl) {
    throw new Error("URL not found");
  }
  //checking whther the Url has been expired or not
  if (orgUrl.expiresAt && orgUrl.expiresAt < new Date()) {
    //deleting if Url expired
    await Url.deleteOne({ _id: orgUrl._id });
    throw new Error("URL has expired");
  }
  return orgUrl;
};

const redirectUrl = async (shortCode) => {
  const orgUrl = await getUrl(shortCode);
  // increment the count clicks
  orgUrl.clicks++;
  await orgUrl.save();
  return orgUrl.orignalUrl;
};

//all the details of the url
const getStats = async (shortCode) => {
  return await getUrl(shortCode);
};

//get the top 10 most visited Url
const getTopUrls = async () => {
  return await Url.find().sort({ clicks: -1 }).limit(10);
};

//cleaning the expired Url
const cleanUpExpiredUrl = async (params) => {
  const result = await Url.deleteMany({
    expiresAt: { $lt: new Date(), $ne: null },
  });
  return result.deletedCount;
};
module.export = {
  shortenUrl,
  getUrl,
  redirectUrl,
  getStats,
  getTopUrls,
  cleanUpExpiredUrl,
};
