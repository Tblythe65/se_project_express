const jwt = require("jsonwebtoken");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(ERROR_CODES.UNAUTHORIZED)
      .send({ message: ERROR_MESSAGES.UNAUTHORIZED });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res
      .status(ERROR_CODES.UNAUTHORIZED)
      .send({ message: ERROR_MESSAGES.UNAUTHORIZED });
  }

  req.user = payload;
  return next();
};

module.exports = auth;
