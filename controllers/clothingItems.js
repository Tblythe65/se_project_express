const ClothingItem = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const createClothingItems = (req, res) => {
  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const deleteClothingItems = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getClothingItems, createClothingItems, deleteClothingItems };
