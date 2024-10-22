import express from 'express';
import { getIngredients } from '../../handlers/ingredients/ingredients.handler.js';


const ingredientsRouter = express.Router();

// Get
ingredientsRouter.get("/ingredients", async (req, res) => {

    const data = await getIngredients();

    // return res.status(200).send({ message: "STUB STUB STUB", data: stub });
    if(data.status === 'ok') {

        return res.status(200).send({ message: data.message, data: data.data });
 
    } else {

        return res.status(200).send({ message: data.message, data: [] });

    }

});


export default ingredientsRouter;
