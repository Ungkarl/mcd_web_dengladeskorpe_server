import dbConnect from "../../db/dbConnect.js";
import dishModel from "../../db/models/dish.model.mjs";
import { deleteDishImage } from "../file.handler.js";


export const addDish = async (body) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};
 
    try {

        
        await dbConnect();
        body.image = body.image === undefined  ? `${process.env.SERVER_HOST}/dishes/no-dish.jpg` : body.image;
   
        let data = await dishModel.create(body);
        result = {status: 'ok', message: "Dish created successfully", data: data}

    } catch (error) {   

        console.log(error)

    }

    return result

}

export const updateDish = async (body) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};
    
    try {
        await dbConnect();
        if(body.image !== undefined)
        {
            await deleteDishImage(body.id);
        }

        let data = await dishModel.findByIdAndUpdate({_id: body.id}, body, {new: true});
        result = {status: 'ok', message: "Dishes updated successfully", data: data}

    } catch (error) {   

        console.log(error)

    }

    return result

}

export const deleteDish = async (id) => {

    let result = {status: 'error', message: `An Error Deleting dish ${id} occurred`, data: []};

    try {

        await dbConnect();
        await deleteDishImage(id);

        await dishModel.findByIdAndDelete({_id: id}).then((data) => {  

            result = {status: 'ok', message: "Dish deleted successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });
        
        return result;

    } catch (error) {

        console.log(error)

    }

};

export const getDishById = async (id) => {

    let result = {status: 'error', message: `An Error Getting Dish occured`, data: []};

    try {

        await dbConnect();

        await dishModel.find({_id : id}).then((data) => {  
            console.log(data)

            if(data.length === 0) {
                
                result = {status: 'error', message: "No dish to fetch", data: data}
                
            } else {

                result = {status: 'ok', message: "Dish fetched successfully", data: data[0]}
            }

          

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {
        
        console.log(error)

    }

};
