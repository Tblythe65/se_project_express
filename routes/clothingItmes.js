const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  createClothingItems,
  deleteClothingItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { validateCardBody, validateId } = require("../middlewares/validation");

router.get("/", getClothingItems);
router.post("/", auth, validateCardBody, createClothingItems);
router.delete("/:itemId", auth, validateId, deleteClothingItems);
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
