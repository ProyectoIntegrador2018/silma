import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const PointOfSaleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: "Name is required"
  },
  place: {
    type: String
  },
  url: {
    type: String
  },
  description:{
    type: String
  }
});
PointOfSaleSchema.plugin(beautifyUnique);

export const PointOfSaleModel = model("PointOfSale", PointOfSaleSchema);
