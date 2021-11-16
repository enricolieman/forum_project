const jwt = require("jsonwebtoken");
const config = require("./config");

const verifyToken = (req, res, next) => {
  const token = req.session.Authorization;

  if (!token) {
      return 0;
  }
  try {
    const decoded = jwt.verify(token, config.secretKey);
    return 1;
  } catch (err) {
      req.session.destroy();
      return 0;
  }
  return next();
};

module.exports = verifyToken;