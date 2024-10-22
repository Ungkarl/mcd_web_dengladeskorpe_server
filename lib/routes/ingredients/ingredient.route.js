import express from 'express';
import auth from '../../middleware/auth.middleware.js';
import multer from 'multer';
import { dishStorage } from '../../db/mcd/misc/mStorage.js';
import { addIngredient, deleteIngredient, updateIngredient } from '../../handlers/ingredients/ingredient.handler.js';

const ingredientRoute = express.Router();
const upload = multer({ storage: dishStorage });

ingredientRoute.post('/ingredient', auth, upload.single('file'), async (req, res) => {

    // const { name, subject, description } = req.body;
    const model = {
        ...req.body
    }

    const result = await addIngredient(model);

    return res.status(200).send({ ...result });
    
});

// PUT / UPDATE
ingredientRoute.put('/ingredient', auth, upload.single('file'), async (req, res) => {
    

    const model = {
        ...req.body,
    }

    const result = await updateIngredient(model);

    return res.status(200).send({ ...result});
    
});

// DELETE -> ID
ingredientRoute.delete('/ingredient/:id', auth, async (req, res) => {

    if(!req.params.id) {

        return res.status(200).send({ message: 'No ID provided', data: {}})

    }

    let result = await deleteIngredient(req.params.id);

    return res.status(200).send({ ...result });

})

export default ingredientRoute;