
import dbConnect from "../../db/dbConnect.js";
import dishModel from "../../db/models/dish.model.mjs";
import ingredientModel from "../../db/models/ingredient.model.mjs";

export const addIngredient = async (body) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};
    console.log(body);    
    try {

        await dbConnect();

        let data = await ingredientModel.create(body);
        result = {status: 'ok', message: "Ingredient created successfully", data: data}

    } catch (error) {   

        console.log(error)

    }

    return result

}

export const deleteIngredient = async (id) => {

    let result = {status: 'error', message: `An Error Deleting ingredient ${id} occurred`, data: []};

    try {

        await dbConnect();
        let ingredient = await ingredientModel.findById({_id: id});
        let dishes = await dishModel.find({ingredients: ingredient.name});
        dishes.forEach(async dish => {

            let index = dish.ingredients.indexOf(ingredient.name);
            
            dish.ingredients.splice(index, 1);

            await dishModel.findByIdAndUpdate({_id: dish._id}, dish, {new: true});
        });

        await ingredientModel.findByIdAndDelete({_id: id}).then((data) => {  

            if(data) {
                result = {status: 'ok', message: "Ingredient deleted successfully", data: data}
            }
            else {
                result = {status: 'error', message: `Ingredient ${id} not found`, data: []}
            }
        

        }).catch((error) => {

            console.log(error);

        });
        
        return result;

    } catch (error) {

        console.log(error)

    }

};

export const updateIngredient = async (body) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};
    
    try {
        await dbConnect();


        let ingredient = await ingredientModel.findById({_id: body.id});
        let dishes = await dishModel.find({ingredients: ingredient.name});

        dishes.forEach(async dish => {

            let index = dish.ingredients.indexOf(ingredient.name);
            dish.ingredients[index] = body.name;
            
            await dishModel.findByIdAndUpdate({_id: dish._id}, dish, {new: true});
        });

        let data = await ingredientModel.findByIdAndUpdate({_id: body.id}, body, {new: true});
        result = {status: 'ok', message: "Ingredient updated successfully", data: data}

    } catch (error) {   

        console.log(error)

    }

    return result

}