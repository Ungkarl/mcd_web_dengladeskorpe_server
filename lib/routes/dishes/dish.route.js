import {
  addDish,
  deleteDish,
  getDishById,
  updateDish,
} from "../../handlers/dishes/dish.handler.js";
import express from "express";
import multer from "multer";
import auth from "../../middleware/auth.middleware.js";
import { dishStorage } from "../../db/mcd/misc/mStorage.js";

const upload = multer({ storage: dishStorage });

const dishRoute = express.Router();

dishRoute.get("/dish/:id", async (req, res) => {
  let result = await getDishById(req.params.id);
  return res.status(200).send({ ...result });
});

// POST / CREATE
dishRoute.post("/dish", auth, upload.single("file"), async (req, res) => {
  const { title, price, ingredients, category } = req.body;

  if (!title || !price || !ingredients || !category) {
    return res.status(200).send({
      status: "error",
      message: "Please provide all required fields, and aleast one ingredient and one category",
      data: [],
    });
  }

  let parsedPriced = JSON.parse(price);

  if (!parsedPriced.normal) {
    return res.status(200).send({
      status: "error",
      message: "Price requires as minimum a normal size order",
      data: [],
    });
  }


  let parsedIngredients = [];

  if(typeof ingredients === "string") {
    // Hvis det bliver sendt som en streng parser vi til array
    parsedIngredients = ingredients.split(",");

  } else {
    // Hvis det bliver sendt som Array lader vi det være.
    parsedIngredients = ingredients;
  }

  const model = {
    title,
    price: parsedPriced,
    ingredients: parsedIngredients,
    category,
  };

  if (req.file) {
    model.image = process.env.SERVER_HOST + "/dishes/" + req.file.filename;
  }

  const result = await addDish(model);

  return res.status(200).send({ ...result });
});

// PUT / UPDATE
dishRoute.put("/dish", auth, upload.single("file"), async (req, res) => {
  const { price, ingredients } = req.body;

  let parsedPriced = JSON.parse(price);
  let parsedIngredients = ingredients.split(",");

  if (!parsedPriced.normal) {
    return res.status(200).send({
      status: "error",
      message: "Price requires a normal size order",
      data: [],
    });
  }

  const model = {
    ...req.body,
    price: parsedPriced,
    ingredients: parsedIngredients,
  };

  if (req.file) {
    model.image = process.env.SERVER_HOST + "/dishes/" + req.file.filename;
  }

  const result = await updateDish(model);

  return res.status(200).send({ ...result });
});

// DELETE -> ID
dishRoute.delete("/dish/:id", auth, async (req, res) => {

  if (!req.params.id) {
    return res.status(200).send({ message: "No ID provided", data: {} });
  }

  let result = await deleteDish(req.params.id);

  return res.status(200).send({ ...result });
});

export default dishRoute;
