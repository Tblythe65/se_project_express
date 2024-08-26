const router = require("express").Router();
const {
  getClothingItems,
  createClothingItems,
  deleteClothingItems,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", createClothingItems);
router.delete("/:itemId", deleteClothingItems);

module.exports = router;
