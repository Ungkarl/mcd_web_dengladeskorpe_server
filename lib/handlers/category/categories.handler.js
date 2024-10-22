import dbConnect from "../../db/dbConnect.js";
import categoryModel from "../../db/models/category.model.mjs";

export const getCategories = async () => {

    let result = {status: 'error', message: `An Error Getting Categories occured`, data: []};

    try {

        await dbConnect();

        await categoryModel.find({}).then((data) => {  

            result = {status: 'ok', message: "Categories fetched successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {
        
        console.log(error)

    }

};