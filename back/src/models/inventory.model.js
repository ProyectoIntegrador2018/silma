import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const InventorySchema = new Schema({
  writer: { type: Schema.Types.ObjectId, ref: "Writer" },
  items: [
    {
       name: String,
       description: String,
       price: Number,
       stock: Number,
       image: String,
       link: String
    }
  ],
});
InventorySchema.plugin(beautifyUnique);

export const InventoryModel = model("Inventory", InventorySchema);
