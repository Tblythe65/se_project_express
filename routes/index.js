const router = require("express").Router();
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const { createUser, loginUser } = require("../controllers/users");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItmes");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.post("/signup", createUser);
router.post("/signin", loginUser);

router.use((req, res) => {
  res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.NOT_FOUND });
});

module.exports = router;
