import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";


export const SuggestionSchema = new Schema({
  reader: {
    type: Schema.Types.ObjectId, ref: 'Reader'
  },
  text: {
    type: Schema.Types.ObjectId, ref: 'Text'
  },
  sentDate: {
    type: Date
  },
  suggestionStatus: {
    type: String,
    enum: ["Pending", "Rejected", "Accepted", "Completed"]
  },
  score: {
    type: Number
  }
});
SuggestionSchema.plugin(beautifyUnique);

export const SuggestionModel = model("Suggestion", SuggestionSchema);
