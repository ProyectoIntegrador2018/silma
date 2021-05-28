import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const InventorySchema = new Schema({
  writer: { type: Schema.Types.ObjectId, ref: "Writer" },
  items: [
    { type: Schema.Types.ObjectId, ref: "Product" },
  ],
});
InventorySchema.plugin(beautifyUnique);

export const InventoryModel = model("Inventory", InventorySchema);
