import express from 'express';
import { getOrders } from '../../handlers/orders/orders.handler.js';

const ordersRouter = express.Router();

// Get
ordersRouter.get("/orders", async (req, res) => {

    const data = await getOrders();

    // return res.status(200).send({ message: "STUB STUB STUB", data: stub });
    if(data.status === 'ok') {

        return res.status(200).send({ message: data.message, data: data.data });
 
    } else {

        return res.status(200).send({ message: data.message, data: [] });

    }

});


export default ordersRouter;