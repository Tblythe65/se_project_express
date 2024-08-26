const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid data passed for creating an item/user",
  NOT_FOUND: "There is no item/user with the requested id",
  SERVER_ERROR: "An error has occurred on the server",
};

//400 404 500

module.exports = { ERROR_CODES, ERROR_MESSAGES };
