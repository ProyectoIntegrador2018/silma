import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const SubgenreSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: "Name is required"
  },
  description: {
    type: String
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: "Genre",
    required: "Genre is required"
  }
});
SubgenreSchema.plugin(beautifyUnique);

export const SubgenreModel = model("Subgenre", SubgenreSchema);
