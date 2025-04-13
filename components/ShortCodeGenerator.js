const createShortCodeGenerator = (length=7) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const generate = () => {
    let shortCode = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortCode += characters[randomIndex];
    }
    return shortCode;
  };

  return { generate };
};
const name =1;
module.exports = createShortCodeGenerator;
