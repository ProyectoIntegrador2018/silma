import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const ProductSchema = new Schema({
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    stock: {type: Number},
    image: {type: String},
    link: {type: String},
    category: {
        type: String,
        enum: ["Book", "Merchandise"]
      },
    inventory: {type: Schema.Types.ObjectId, ref: "Inventory"}
});
ProductSchema.plugin(beautifyUnique);

export const ProductModel = model("Product", ProductSchema);
