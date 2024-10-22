import dbConnect from "../../db/dbConnect.js";
import orderModel from "../../db/models/order.model.mjs";


export const addOrder = async (body) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};
    console.log("body", body)
    try {

        await dbConnect();

        let data = await orderModel.create(body);
        result = {status: 'ok', message: "Order created successfully", data: data}

    } catch (error) {   

        console.log(error)

    }

    return result

}

export const updateOrder = async (body) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};

    try {

        await dbConnect();

        let data = await orderModel.findByIdAndUpdate({ _id: body.id }, body, {
            new: true,
        });

        result = {status: 'ok', message: "Order updated successfully", data: data}

    } catch (error) {   

        console.log(error)

    }

    return result

}


export const deleteOrder = async (id) => {

    let result = {status: 'error', message: `An Error Deleting Order ${id} occurred`, data: []};

    try {

        await dbConnect();

        await orderModel.findByIdAndDelete({_id: id}).then((data) => {  

            result = {status: 'ok', message: "Order deleted successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });
        
        return result;

    } catch (error) {

        console.log(error)

    }

};
