import dbConnect from "../../db/dbConnect.js";
import categoryModel from "../../db/models/category.model.mjs";
import dishModel from "../../db/models/dish.model.mjs";
import { deleteCategoryImage } from "../file.handler.js";

// ADD EMPLOYEE
export const addCategory = async (body) => {
    let result = { status: "error", message: "An Error Occurred", data: [] };
  
    try {
      await dbConnect();
      body.image = body.image === undefined 
          ? `${process.env.SERVER_HOST}/categories/no-category.jpg`
          : body.image;
  
      let data = await categoryModel.create(body);

      result = {
        status: "ok",
        message: "Category created successfully",
        data: data,
      };
    } catch (error) {
      console.log(error);
    }
  
    return result;
};

export const updateCategory = async (body) => {


  let result = {status: 'error', message: "An Error Occurred", data: []};
  
  try {
      await dbConnect();

      if (body.image !== undefined) {
        await deleteCategoryImage(body.id);
      }


      let category = await categoryModel.findById({_id: body.id});
      let dishes = await dishModel.find({category: category.name});

      dishes.forEach(async dish => {

        
          dish.category = body.name;
          
          await dishModel.findByIdAndUpdate({_id: dish._id}, dish, {new: true});
      });

      let data = await categoryModel.findByIdAndUpdate({_id: body.id}, body, {new: true});
      result = {status: 'ok', message: "Category updated successfully", data: data}

  } catch (error) {   

      console.log(error)

  }

  return result

}

// DELETE EMPLOYEE
export const deleteCategory = async (id) => {
  let result = {
    status: "error",
    message: `An Error Deleting review ${id} occurred`,
    data: [],
  };

  try {
    await dbConnect();
    await deleteCategoryImage(id);


    let category = await categoryModel.findById({_id: id});
    let dishes = await dishModel.find({category: category.name});

    dishes.forEach(async dish => {

      dish.category = "Uncategorized";

      await dishModel.findByIdAndUpdate({_id: dish._id}, dish, {new: true});
    });


    await categoryModel
      .findByIdAndDelete({ _id: id })
      .then((data) => {
        result = {
          status: "ok",
          message: "Category deleted successfully",
          data: data,
        };
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
  } catch (error) {
    console.log(error);
  }
};