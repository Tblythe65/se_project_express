const router = require("express").Router();
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const { createUser, loginUser } = require("../controllers/users");
const {
  validateRegisterBody,
  validateLoginBody,
} = require("../middlewares/validation");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItmes");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.post("/signup", validateRegisterBody, createUser);
router.post("/signin", validateLoginBody, loginUser);

router.use((req, res) => {
  res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.NOT_FOUND });
});

module.exports = router;
