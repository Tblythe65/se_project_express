const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!email) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: "Email required" });
  }
  if (!validator.isEmail(email)) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: "Invalid Email" });
  }
  if (!validator.isURL(avatar)) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: "Invalid avatar format" });
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error("Email already in use");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      return User.create({ name, avatar, email, password: hash });
    })
    .then((newUser) => {
      const response = newUser.toObject();
      delete response.password;
      return res.send({ data: response });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      if (err.message === "Email already in use") {
        return res
          .status(ERROR_CODES.CONFLICT)
          .send({ message: ERROR_MESSAGES.CONFLICT });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.BAD_REQUEST });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.BAD_REQUEST });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return res
          .status(ERROR_CODES.UNAUTHORIZED)
          .send({ message: ERROR_MESSAGES.UNAUTHORIZED });
      }
      return res.status(ERROR_CODES.SERVER_ERROR).send({
        message: ERROR_MESSAGES.SERVER_ERROR,
      });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error(err);
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports = { createUser, getCurrentUser, loginUser, updateUser };
