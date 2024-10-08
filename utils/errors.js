const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

const ERROR_MESSAGES = {
  BAD_REQUEST:
    "Iinvalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.",
  NOT_FOUND:
    "Tthere is no user or clothing item with the requested id, or the request was sent to a non-existent address.",
  SERVER_ERROR: "An error has occurred on the server.",
  CONFLICT: "Email already in use",
  UNAUTHORIZED: "Invalid email or password",
  FORBIDDEN: "Access Denied",
};

module.exports = { ERROR_CODES, ERROR_MESSAGES };
