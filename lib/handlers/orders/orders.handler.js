import dbConnect from "../../db/dbConnect.js";
import orderModel from "../../db/models/order.model.mjs";

export const getOrders = async () => {

    let result = {status: 'error', message: `An Error Getting Orders occured`, data: []};

    try {

        await dbConnect();

        await orderModel.find({}).then((data) => {  

            result = {status: 'ok', message: "Orders fetched successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {
        
        console.log(error)

    }

};