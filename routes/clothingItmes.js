const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  createClothingItems,
  deleteClothingItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", auth, createClothingItems);
router.delete("/:itemId", auth, deleteClothingItems);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
