import { InventoryModel } from "@/models/inventory.model";
import { send } from "@/utils/errors";
import { WriterModel } from "@/models/writer.model";

//Obtiene todos los inventarios
export const getInventories = (request, response) => {
  send(response, async () => {
    const inventories = await InventoryModel.find().populate("writer");
    return inventories;
  });
};

//Obtiene un inventario por su id
export const getInventory = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const inventory = await InventoryModel.findById(id).populate("writer");
    return inventory;
  });
};

//Obtiene un inventario especifico por el id del escritor
export const getInventoryByWriterId = (request, response) => {
    send(response, async () => {
      const { writerId } = request.params;
      const inventoryWriter = await WriterModel.findOne({ user: writerId });
      const inventory = await InventoryModel.findOne({'writer': inventoryWriter}).populate("writer");
      return inventory;
    });
  };

//Funcion que crea un usuario y lector que no está registrado
export const createInventory = async (request, response, item)  => {
  send(response, async () => {
    const {writerId} = request.params;
    const inventoryWriter = await WriterModel.findOne({ user: writerId });
    const inventory = await InventoryModel.findOne({ writer: inventoryWriter });
    if (!inventory) {
      const inventoryData = {
        writer: inventoryWriter._id,
        items: [item]
      };
      const newInventory= await InventoryModel.create(inventoryData);
      newInventory.writer = inventoryWriter;
      return newInventory;
    } else {
      throw { error: "This user has already an inventory" };
    }
  });
};

//Funcion que agrega items a un inventario
export const addItems = (request, response) => {
  send(response, async () => {
    const data = request.body;
    const {writerId, id} = request.query;
    try {
      const inventory = await InventoryModel.findById(id)
      if(!inventory){
        const inventoryWriter = await WriterModel.findOne({ user: writerId });
        const inventoryData = {
          writer: inventoryWriter._id,
          items: [data]
        };
        const newInventory= await InventoryModel.create(inventoryData);
        newInventory.writer = inventoryWriter;
        return newInventory;
      }
      else{
        inventory.items = inventory.items.concat(data)
        await inventory.save() 
        return inventory;  
      }
    } catch(error) {
      console.log(error)
      throw { error: "Error adding items" };
    }
  });
};

//Funcion que borra un item a un inventario
export const removeItem = (request, response) => {
    send(response, async () => {
      const { id, itemId } = request.query
      console.log(request.query)
      try {
        const inventory = await InventoryModel.findById(id)
        inventory.items = inventory.items.filter((item) => item._id != itemId)
        await inventory.save() 
        return inventory
      } catch {
        throw { error: "Error deleting item" };
      }
    });
  };

//Funcion que agrega items a un inventario
export const editItem = (request, response) => {
    send(response, async () => {
      const { id, itemId } = request.query
      const data = request.body
      try {
        const inventory = await InventoryModel.findById(id)
        inventory.items = inventory.items.map((item) =>{
            if(item._id == itemId)
                return {...data, _id: itemId}
            return item
        })
        await inventory.save() 
        return inventory
      } catch {
        throw { error: "Error editing item" };
      }
    });
  };
