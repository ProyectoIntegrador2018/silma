import { ProductModel } from "@/models/product.model";
import { send } from "@/utils/errors";
import { InventoryModel } from "@/models/inventory.model";

//Obtiene todos los productos
export const getProducts = (request, response) => {
  send(response, async () => {
    const products = await ProductModel.find();
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
        product.save()
        return product
      } catch {
        throw { error: "Error editing item" };
      }
    });
  };
