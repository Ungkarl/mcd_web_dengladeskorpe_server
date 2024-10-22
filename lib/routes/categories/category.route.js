import express from 'express';
import multer from "multer";
import { addCategory, deleteCategory, updateCategory } from "../../handlers/category/category.handler.js";
import auth from "../../middleware/auth.middleware.js";
import { categoryStorage } from '../../db/mcd/misc/mStorage.js';

const categoryRouter = express.Router();

const upload = multer({ storage: categoryStorage });

// POST / CREATE
categoryRouter.post("/category", auth, upload.single("file"), async (req, res) => {
  
    const { name } = req.body;

    if (!name) {
      return res.status(200).send({
        status: "error",
        message: "Please provide all required fields",
        data: [],
      });
    }

    const model = {
      name
    };

    if (req.file) {
      model.image = process.env.SERVER_HOST + "/categories/" + req.file.filename;
    }

    const result = await addCategory(model);

    return res.status(200).send({ ...result });
  }
);


// PUT / UPDATE
categoryRouter.put('/category', auth, upload.single('file'), async (req, res) => {
    

  const model = {
      ...req.body,
  }

  if (req.file) {
    model.image = process.env.SERVER_HOST + "/categories/" + req.file.filename;
  }

  const result = await updateCategory(model);

  return res.status(200).send({ ...result});
  
});

// DELETE -> ID
categoryRouter.delete('/category/:id', auth, async (req, res) => {

  if(!req.params.id) {

      return res.status(200).send({ message: 'No ID provided', data: {}})

  }

  let result = await deleteCategory(req.params.id);

  return res.status(200).send({ ...result });

})

export default categoryRouter;