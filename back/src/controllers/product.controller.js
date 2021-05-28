import { ProductModel } from "@/models/product.model";
import { send } from "@/utils/errors";
import { InventoryModel } from "@/models/inventory.model";
import config from "../config/config";
const AWS = require("aws-sdk");
import { getImage } from "@/controllers/aws.controller";

//Obtiene todos los productos
export const getProducts = (request, response) => {
  send(response, async () => {
    const products = await ProductModel.find().populate({ 
      path : 'inventory', 
      populate : { path: 'writer'}
    });
    return products;
  });
};

//Obtiene un producto por su id
export const getProduct = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const product = await ProductModel.findById(id);
    return product;
  });
};


//Funcion que crea un usuario y lector que no está registrado
export const createProduct = (request, response)  => {
  send(response, async () => {
    const {inventoryId} = request.query;
    const data = {...request.body, inventory: inventoryId};

    console.log(inventoryId)
    try {
      const newProduct = await ProductModel.create(data);
      if(inventoryId){
        const inventory = await InventoryModel.findOne({ _id: inventoryId });
        inventory.items.push(newProduct)
        inventory.save()
        console.log(inventory)
      }
      return newProduct;
    }catch(error) {
      console.log(error)
      throw { error: "Error adding items" };
    }
  });
};

//Funcion que borra un item a un inventario
export const deleteProduct = (request, response) => {
    send(response, async () => {
      const { id, inventoryId } = request.query
      console.log(request.query)
      try {
        const product = await ProductModel.findByIdAndRemove(id)
        if(inventoryId){
          const inventory = await InventoryModel.findOne({ _id: inventoryId });
          inventory.items = inventory.items.filter((item) => item._id != id)
          inventory.save()
        }
        return product
      } catch {
        throw { error: "Error deleting item" };
      }
    });
  };

//Funcion que agrega items a un inventario
export const editProduct = (request, response) => {
    send(response, async () => {
      const { id } = request.query
      const data = request.body
      try {
        const product = await ProductModel.findById(id)
        product.name = data.name;
        product.description = data.description;
        product.price = data.price;
        product.stock = data.stock;
        product.image = data.image;
        product.link = data.link;
        product.category = data.category;
        product.save()
        return product
      } catch {
        throw { error: "Error editing item" };
      }
    });
  };

  // Response with the text document of a particular text.
  export const retrieveImage = (request, response) => {
    send(response, async () => {
      try {
        const { id } = request.params;
        console.log(id)
        var image = await getImage(id);
        let data = Buffer.from(image.Body).toString('base64');
        return { file : data};
      } catch (err) {
        response.status(404).send({ message: "File does not exist" });
      }
    });
  };
  // Uploads to aws the text document of a particular text.
  export const uploadImage = (request, response) => {
    send(response, async () => {
      const { id } = request.params
      try {
        var s3 = new AWS.S3({credentials:{secretAccessKey: config.AWS_SECRET_ACCESS_KEY, accessKeyId: config.AWS_ACCESS_KEY_ID},
          params: { Bucket: config.AWS_BUCKET + "/Images", Key: "", Body: "" }
        });
        console.log(s3)
        var fileN;
        const image = request.files.image;
        console.log(image)
        // Setting up S3 upload parameters
        fileN = id+'.png';
        const params = {
          Key: fileN, // File name you want to save as in S3
          Body: image.data,
        };
        s3.upload(params, async function(err, data) {
          if (err) {
              throw err;
          }
          console.log(`File uploaded successfully. ${data.Location}`);
          const product = await ProductModel.findById(id)
          product.image = fileN;
          product.save()
        });
      }catch (error) {
        console.error(error);
        return res.status(500);
      }
    });
  };