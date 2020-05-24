import { Schema, model } from "mongoose";
import { minLengthRule } from "@/utils/validators";
import beautifyUnique from "mongoose-beautiful-unique-validation";


export const FeedbackSchema = new Schema({
    suggestion:{
        type: Schema.Types.ObjectId, ref: 'Suggestion'
    },
    reader: {
        type: Schema.Types.ObjectId, ref: 'Reader'
    },
    selectedGenres: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Genre"
        }],
        validate: [minLengthRule(3), "Preferences must have at least 3 genres."]
    },
    publish: {
        type: String
    },
    page:{
        type: Number
    },
    grade:{
        type: Number
    },
    badCharacter: {
        type: String
    },
    goodCharacter:{
        type: String
    },
    liked: {
        type: String
    },
    disliked:{
        type: String
    }
  });
  FeedbackSchema.plugin(beautifyUnique);
  
  export const FeedbackModel = model("Feedback", FeedbackSchema);
  