import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const WriterSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  pseudonym: { 
    type: String,
    unique: "Pseudonym {VALUE} already registered as a writer" 
  },
  phase: { type: Number, default: 1, min: 1, max: 4 },
  isPlus: { type: Boolean, default: false },
});
WriterSchema.plugin(beautifyUnique);

export const WriterModel = model("Writer", WriterSchema);
