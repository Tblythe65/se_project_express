const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/UnauthorizedError");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new UnauthorizedError("You are not authorized to complete this action")
    );
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(
      new UnauthorizedError("You are not authorized to complete this action")
    );
  }

  req.user = payload;
  return next();
};

module.exports = auth;
