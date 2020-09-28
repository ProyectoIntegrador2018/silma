import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const GenreSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: "Name is required"
  }
});
GenreSchema.plugin(beautifyUnique);

export const GenreModel = model("Genre", GenreSchema);
