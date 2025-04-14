const URLValidator = {
  validate: (url) => {
    if (!url || typeof url !== "string") {
      return { valid: false, message: "Invalid URL" };
    }
    // Check whether it starts with http or https
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return { valid: false, message: "URL must start with http or https" };
    }

    try {
      // JavaScript provides the URL constructor to validate URLs
      new URL(url);
      return { valid: true, message: "Valid URL" };
    } catch (error) {
      return { valid: false, message: "Invalid URL" };
    }
  },
};

module.exports = URLValidator;
