
import dbConnect from "../../db/dbConnect.js";
import dishModel from "../../db/models/dish.model.mjs";

export const getDishes = async () => {

    let result = {status: 'error', message: `An Error Getting Dishes occured`, data: []};

    try {

        await dbConnect();

        await dishModel.find({}).then((data) => {  

            result = {status: 'ok', message: "Dishes fetched successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {
        
        console.log(error)

    }

};