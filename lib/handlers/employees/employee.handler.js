import dbConnect from "../../db/dbConnect.js";
import employeeModel from "../../db/models/employee.model.mjs";
import { deleteEmployeeImage } from "../file.handler.js";

// GET EMPLOYEE BY ID
export const getEmployeeById = async (id) => {
  let result = {
    status: "error",
    message: `An Error Getting Employee occured`,
    data: [],
  };

  try {
    await dbConnect();

    await employeeModel
      .find({ _id: id })
      .then((data) => {
        console.log(data);

        if (data.length === 0) {
          result = {
            status: "error",
            message: "No employee to fetch",
            data: data,
          };
        } else {
          result = {
            status: "ok",
            message: "Employee fetched successfully",
            data: data,
          };
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
  } catch (error) {
    console.log(error);
  }
};

// ADD EMPLOYEE
export const addEmployee = async (body) => {
  let result = { status: "error", message: "An Error Occurred", data: [] };

  try {
    await dbConnect();
    body.image =
      body.image === undefined
        ? `${process.env.SERVER_HOST}/employees/no-employee.jpg`
        : body.image;

    let data = await employeeModel.create(body);
    result = {
      status: "ok",
      message: "Employee created successfully",
      data: data,
    };
  } catch (error) {
    console.log(error);
  }

  return result;
};

// UPDATE EMPLOYEE
export const updateEmployee = async (body) => {

  let result = { status: "error", message: "An Error Occurred", data: [] };

  try {
    await dbConnect();
    if (body.image !== undefined) {
      await deleteEmployeeImage(body.id);
    }

    let data = await employeeModel.findByIdAndUpdate({ _id: body.id }, body, {
      new: true,
    });

    result = {
      status: "ok",
      message: "Employee updated successfully",
      data: data,
    };

  } catch (error) {
    console.log(error);
  }

  return result;
};

// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {
  let result = {
    status: "error",
    message: `An Error Deleting review ${id} occurred`,
    data: [],
  };

  try {
    await dbConnect();
    await deleteEmployeeImage(id);

    await employeeModel
      .findByIdAndDelete({ _id: id })
      .then((data) => {
        result = {
          status: "ok",
          message: "Employee deleted successfully",
          data: data,
        };
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
  } catch (error) {
    console.log(error);
  }
};
