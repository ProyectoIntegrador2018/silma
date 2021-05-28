import { InventoryModel } from "@/models/inventory.model";
import { send } from "@/utils/errors";
import { WriterModel } from "@/models/writer.model";

//Obtiene todos los inventarios
export const getInventories = (request, response) => {
  send(response, async () => {
    const inventories = await InventoryModel.find().populate("writer").populate("items");
    return inventories;
  });
};

//Obtiene un inventario por su id
export const getInventory = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const inventory = await InventoryModel.findById(id).populate("writer").populate("items");
    return inventory;
  });
};

//Obtiene un inventario especifico por el id del escritor
export const getInventoryByWriterId = (request, response) => {
    send(response, async () => {
      const { writerId } = request.params;
      const inventoryWriter = await WriterModel.findOne({ user: writerId });
      const inventory = await InventoryModel.findOne({'writer': inventoryWriter}).populate("writer").populate("items");
      return inventory;
    });
  };

//Funcion que crea un usuario y lector que no está registrado
export const createInventory =  (request, response, item)  => {
  send(response, async () => {
    const {writerId } = request.query;
    try{
      const inventoryWriter = await WriterModel.findOne({ user: writerId });
      const inventory = await InventoryModel.findOne({ writer: inventoryWriter });
      if (!inventory) {
        const inventoryData = {
          writer: inventoryWriter._id,
          items: []
        };
        const newInventory= await InventoryModel.create(inventoryData);
        newInventory.writer = inventoryWriter;
        return newInventory;
      } else {
        throw { error: "This user has already an inventory"};
      }  
    }catch(error) {
      console.log(error)
      throw { error: "Error creating inventory" };
    }
  });
};


