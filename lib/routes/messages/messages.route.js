import express from 'express';
import { getDishes } from '../../handlers/dishes/dishes.handler.js';
import { getMessages } from '../../handlers/messages/messages.handler.js';

const messagesRouter = express.Router();

// Get
messagesRouter.get("/messages", async (req, res) => {


    const data = await getMessages();

    // return res.status(200).send({ message: "STUB STUB STUB", data: stub });
    if(data.status === 'ok') {

        return res.status(200).send({ message: data.message, data: data.data });
 
    } else {

        return res.status(200).send({ message: data.message, data: [] });

    }

});


export default messagesRouter;