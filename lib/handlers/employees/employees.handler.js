
import dbConnect from "../../db/dbConnect.js";
import employeeModel from "../../db/models/employee.model.mjs";

export const getEmployees = async () => {

    let result = {status: 'error', message: `An Error Getting Ingredient occured`, data: []};

    try {

        await dbConnect();

        await employeeModel.find({}).then((data) => {  

            result = {status: 'ok', message: "Ingredient fetched successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {
        
        console.log(error)

    }

};