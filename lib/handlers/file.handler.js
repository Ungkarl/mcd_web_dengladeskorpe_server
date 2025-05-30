import * as fs from "fs";
import * as path from "path";
import * as url from "url";

// Models
import userModel from "../db/models/user.model.mjs";
import dishModel from "../db/models/dish.model.mjs";
import employeeModel from "../db/models/employee.model.mjs";
import categoryModel from "../db/models/category.model.mjs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const deleteFile = async (image) => {
  let img = image.split(process.env.SERVER_HOST)[1];
  let imgPath = path.join(__dirname, "../../public" + img);

  if (img && img.indexOf("no-") === -1 && img.indexOf("seed_") === -1) {
    try {
      fs.unlinkSync(imgPath),
        {
          force: true,
        };
    } catch (error) {
      console.log(error);
    }
  }
};

export const deleteUserImage = async (id) => {
  let old = await userModel.findById({ _id: id });
  await deleteFile(old.picture);
};

export const deleteDishImage = async (id) => {

  let old = await dishModel.findById({ _id: id });

  await deleteFile(old.image);
};

export const deleteEmployeeImage = async (id) => {

  let old = await employeeModel.findById({ _id: id });

  await deleteFile(old.image);
};


export const deleteCategoryImage = async (id) => {

  let old = await categoryModel.findById({ _id: id });

  await deleteFile(old.image);
};
