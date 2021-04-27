import { SaleModel } from "@/models/sale.model";

export async function searchSales(query) {
  const sale = await SaleModel.find().populate("event");
  return sale;
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
