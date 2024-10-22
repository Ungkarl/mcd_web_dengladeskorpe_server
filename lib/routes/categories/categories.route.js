import express from 'express';
import { getCategories } from '../../handlers/category/categories.handler.js';

const categoriesRouter = express.Router();

// Get
categoriesRouter.get("/categories", async (req, res) => {

    const data = await getCategories();

    if(data.status === 'ok') {

        return res.status(200).send({ message: data.message, data: data.data });
 
    } else {

        return res.status(200).send({ message: data.message, data: [] });

    }

});


export default categoriesRouter;
