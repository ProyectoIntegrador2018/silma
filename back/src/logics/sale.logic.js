import { SaleModel } from "@/models/sale.model";
import { InventoryModel } from "@/models/inventory.model";
import { WriterModel } from "@/models/writer.model";

export async function searchSales(query) {
  const sale = await SaleModel.find().populate("event").populate("items.productId");
  return sale;
}

export async function searchSalesByWriterId(queryId) {
  console.log(queryId);
  const inventoryWriter = await WriterModel.findOne({ user: queryId });
  var sales = await SaleModel.find().populate("event").populate("items.productId");
  var products = await InventoryModel.findOne({'writer': inventoryWriter}).populate("writer").populate("items");
  var auxId1 = ""; 
  var auxId2 = ""; 
  var auxProtuct = {
    title: "",
    writer: "",
    quantity: 0,
    total: 0,
    category: ""
  };
  var salesItems = [];
  for (var i = 0; i < products.items.length; i++) {
      auxProtuct.title = products.items[i].name;
      auxProtuct.writer = products.writer;
      auxProtuct.quantity = 0;
      auxProtuct.total = 0;
      auxProtuct.category = products.items[i].category;
      for (var j = 0; j < sales.length; j++) {
        for (var k = 0; k < sales[j].items.length; k++) {
          auxId1 = sales[j].items[k].productId._id;
          auxId2 = products.items[i]._id;
          var strinauxId1 = JSON.stringify(auxId1)
          var strinauxId2 = JSON.stringify(auxId2)
          if(strinauxId1 === strinauxId2){
            auxProtuct.quantity = auxProtuct.quantity + sales[j].items[k].numberOfItems;
            auxProtuct.total = auxProtuct.total + sales[j].items[k].subtotal;
          }
        }
      }
      salesItems.push({
        title: auxProtuct.title,
        writer: auxProtuct.writer,
        quantity: auxProtuct.quantity,
        total: auxProtuct.total,
        category: auxProtuct.category
      }); 
  }
  return salesItems;
}


export async function getSaleById(saleId) {
  const sale = await SaleModel.findById(saleId);
  return sale;
}

export async function createSale(sale) {
  const newSaleModel = new SaleModel(sale);
  const newSale = await newSaleModel.save();
  return newSale;
}

export async function updateSale(id, sale) {
  const saleModel = await SaleModel.findById(id);
  const updatedSaleModel = Object.assign(saleModel, sale);
  const updatedSale = await updatedSaleModel.save();

  return updatedSale;
}

export async function deleteSale(id) {
  const saleToDelete = await SaleModel.findById(id);
  const deletedSale = await saleToDelete.deleteOne();

  return deletedSale;
}
