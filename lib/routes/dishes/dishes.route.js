import express from 'express';
import { getDishes } from '../../handlers/dishes/dishes.handler.js';

const dishesRouter = express.Router();

// Get
dishesRouter.get("/dishes", async (req, res) => {


    const data = await getDishes();

    // return res.status(200).send({ message: "STUB STUB STUB", data: stub });
    if(data.status === 'ok') {

        return res.status(200).send({ message: data.message, data: data.data });
 
    } else {

        return res.status(200).send({ message: data.message, data: [] });

    }

});


export default dishesRouter;
