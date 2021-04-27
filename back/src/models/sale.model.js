import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const SaleSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      },
      name: String,
      price: Number,
      numberOfItems: Number,
      subtotal: Number
    }
  ],
  total: {
    type: Number,
    required: true
  }
});
SaleSchema.plugin(beautifyUnique);

export const SaleModel = model("Sale", SaleSchema);
