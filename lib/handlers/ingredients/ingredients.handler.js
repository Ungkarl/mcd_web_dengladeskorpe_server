
import dbConnect from "../../db/dbConnect.js";
import ingredientModel from "../../db/models/ingredient.model.mjs";

export const getIngredients = async () => {

    let result = {status: 'error', message: `An Error Getting Ingredient occured`, data: []};

    try {

        await dbConnect();

        await ingredientModel.find({}).then((data) => {  

            result = {status: 'ok', message: "Ingredient fetched successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {
        
        console.log(error)

    }

};