const router = require("express").Router();
const { getClothingItems } = require("../controllers/clothingItems");

router.get("/", getClothingItems);

module.exports = router;
