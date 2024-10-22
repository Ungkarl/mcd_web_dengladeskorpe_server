import dbConnect from "../../db/dbConnect.js";
import messageModel from "../../db/models/message.model.mjs";

export const addMessage = async (body) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};
    
    try {

        await dbConnect();

        let data = await messageModel.create(body);
        result = {status: 'ok', message: "Message created successfully", data: data}

    } catch (error) {   

        console.log(error)

    }

    return result

}

export const deleteMessage = async (id) => {

    let result = {status: 'error', message: `An Error Deleting message ${id} occurred`, data: []};

    try {

        await dbConnect();

        await messageModel.findByIdAndDelete({_id: id}).then((data) => {  

            result = {status: 'ok', message: "Message deleted successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });
        
        return result;

    } catch (error) {

        console.log(error)

    }

};

export const updateMessage  = async (body) => {


    let result = {status: 'error', message: "An Error Occurred", data: []};
    
    try {
        await dbConnect();
  
        let data = await messageModel.findByIdAndUpdate({_id: body.id}, body, {new: true});
        result = {status: 'ok', message: "Message updated successfully", data: data}
  
    } catch (error) {   
  
        console.log(error)
  
    }
  
    return result
  
  }