import express from "express";
import multer from "multer";
import auth from "../../middleware/auth.middleware.js";
import { employeeStorage } from "../../db/mcd/misc/mStorage.js";
import {
  addEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../handlers/employees/employee.handler.js";

const upload = multer({ storage: employeeStorage });

const employeeRoute = express.Router();

// GET BY ID
employeeRoute.get("/employee/:id", async (req, res) => {
  let result = await getEmployeeById(req.params.id);
  return res.status(200).send({ ...result });
});


// POST / CREATE
employeeRoute.post("/employee", auth, upload.single("file"), async (req, res) => {
  
    const { name, position } = req.body;

    if (!name || !position) {
      return res.status(200).send({
        status: "error",
        message: "Please provide all required fields",
        data: [],
      });
    }

    const model = {
      name,
      position,
    };

    if (req.file) {
      model.image = process.env.SERVER_HOST + "/employees/" + req.file.filename;
    }

    const result = await addEmployee(model);

    return res.status(200).send({ ...result });
  }
);

// PUT / UPDATE
employeeRoute.put("/employee", auth, upload.single("file"), async (req, res) => {
  
  const model = {
    ...req.body,
  };

  if (req.file) {
    model.image = process.env.SERVER_HOST + "/employees/" + req.file.filename;
  }

  const result = await updateEmployee(model);

  return res.status(200).send({ ...result });
});

// DELETE EMPLOYEE BY ID
employeeRoute.delete("/employee/:id", auth, async (req, res) => {
  if (!req.params.id) {
    return res.status(200).send({ message: "No ID provided", data: {} });
  }

  let result = await deleteEmployee(req.params.id);

  return res.status(200).send({ ...result });
});

export default employeeRoute;
