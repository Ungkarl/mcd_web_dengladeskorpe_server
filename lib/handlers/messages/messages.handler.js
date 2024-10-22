import dbConnect from "../../db/dbConnect.js";
import messageModel from "../../db/models/message.model.mjs";

export const getMessages = async () => {

    let result = {status: 'error', message: `An Error Getting Messages occured`, data: []};

    try {

        await dbConnect();

        await messageModel.find({}).then((data) => {  

            result = {status: 'ok', message: "Messages fetched successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {
        
        console.log(error)

    }

};