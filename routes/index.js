const router = require("express").Router();
const { NotFoundError } = require("../utils/NotFoundError");
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

router.use((req, res, next) => {
  return next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
