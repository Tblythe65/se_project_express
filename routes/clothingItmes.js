const router = require("express").Router();
const {
  getClothingItems,
  createClothingItems,
  deleteClothingItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", createClothingItems);
router.delete("/:itemId", deleteClothingItems);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
