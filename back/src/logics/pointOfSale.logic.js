import { PointOfSaleModel } from "@/models/pointOfSale.model";
import * as PointOfSaleValidation from "../validations/pointOfSale.validation";

export async function searchPoS(query) {
  const poS = await PointOfSaleModel.find();
  return poS;
}

export async function getPoSById(poSId) {
  const poS = await PointOfSaleModel.findById(poSId);
  return poS;
}

export async function createPoS(poS) {
  const newPoSModel = new PointOfSaleModel(poS);
  const newPoS = await newPoSModel.save();
  return newPoS;
}

export async function updatePoS(id, poS) {
  const poSModel = await PointOfSaleModel.findById(id);
  const updatedPoSModel = Object.assign(poSModel, poS);
  const updatedPoS = await updatedPoSModel.save();

  return updatedPoS;
}

export async function deletePoS(id) {
  const poSToDelete = await PointOfSaleModel.findById(id);
  
  // Validate genre delete
  await PointOfSaleValidation.onDeleteValidations(poSToDelete);

  const deletedPoS = await poSToDelete.deleteOne();

  return deletedPoS;
}
