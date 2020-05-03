import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";


export const SuggestionSchema = new Schema({
    reader: {
        type: Schema.Types.ObjectId, ref: 'Reader'
    },
    text: {
        type: Schema.Types.ObjectId, ref: 'Text'
    },
    sentDate:{
        type: Date
    },
    /* Status can be set to Pending, Rejected, Accepted, Completed etc */
    suggestionStatus: {
        type: String
    },
    score:{
        type: Number
    }
  });
  SuggestionSchema.plugin(beautifyUnique);
  
  export const SuggestionModel = model("Suggestion", SuggestionSchema);
  