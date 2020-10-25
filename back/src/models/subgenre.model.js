import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";
import { onSaveValidations } from "../validations/subgenre.validation";

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

SubgenreSchema.pre("save", async function (next) {
  onSaveValidations(this);
  next();
});

export const SubgenreModel = model("Subgenre", SubgenreSchema);
