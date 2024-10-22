import express from 'express';
import auth from '../../middleware/auth.middleware.js';
import multer from 'multer';
import { dishStorage } from '../../db/mcd/misc/mStorage.js';
import { addOrder, deleteOrder, updateOrder } from '../../handlers/orders/order.handler.js';

const orderRoute = express.Router();
const upload = multer({ storage: dishStorage });

// POST / CREATE
orderRoute.post('/order', upload.single('file'), async (req, res) => {

    // const { name, subject, description } = req.body;

    const model = {
        ...req.body
    }

    const result = await addOrder(model);

    return res.status(200).send({ ...result });
    
});

// POST / CREATE
orderRoute.put('/order', upload.single('file'), async (req, res) => {

    // const { name, subject, description } = req.body;

    const model = {
        ...req.body
    }

    const result = await updateOrder(model);

    return res.status(200).send({ ...result });
    
});

// DELETE -> ID
orderRoute.delete('/order/:id', auth, async (req, res) => {

    
    if(!req.params.id) {
        return res.status(200).send({ message: 'No ID provided', data: {}})
    }

    let result = await deleteOrder(req.params.id);

    return res.status(200).send({ ...result });

})


export default orderRoute;