import express from 'express';
import { getEmployees } from '../../handlers/employees/employees.handler.js';

const employeesRouter = express.Router();

// Get
employeesRouter.get("/employees", async (req, res) => {

    const data = await getEmployees();

    // return res.status(200).send({ message: "STUB STUB STUB", data: stub });
    if(data.status === 'ok') {

        return res.status(200).send({ message: data.message, data: data.data });
 
    } else {

        return res.status(200).send({ message: data.message, data: [] });

    }

});


export default employeesRouter;
