import express from 'express';
import multer from 'multer';
import auth from "../../middleware/auth.middleware.js";
import { dishStorage } from "../../db/mcd/misc/mStorage.js";
import { addMessage, deleteMessage, updateMessage } from '../../handlers/messages/message.handler.js';

const upload = multer({ storage: dishStorage });
const messageRoute = express.Router();

// POST / CREATE
messageRoute.post('/message', upload.single('file'), async (req, res) => {

    const { name, subject, description } = req.body;

    if(!name || !subject || !description) {
        return res.status(200).send( {status: 'error',  message: 'Please provide all required fields', data: []});
    }

    const model = {
        ...req.body
    }

    const result = await addMessage(model);

    return res.status(200).send({ ...result });
    
});

// DELETE -> ID
messageRoute.delete('/message/:id', auth, async (req, res) => {

    if(!req.params.id) {
        return res.status(200).send({ message: 'No ID provided', data: {}})
    }

    let result = await deleteMessage(req.params.id);

    return res.status(200).send({ ...result });

})

// PUT / UPDATE
messageRoute.put("/message", upload.single("file"), async (req, res) => {

    const model = {
      ...req.body,
    };
  
    const result = await updateMessage(model);
  
    return res.status(200).send({ ...result });
  });
  
export default messageRoute;