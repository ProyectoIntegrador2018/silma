import { Schema, model } from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

export const EventSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: "Name is required"
  },
  description: {
    type: String
  },
  place: {
    type: String
  },
  date: {
    type: String
  },
  time:{
    type: String
  }
});
EventSchema.plugin(beautifyUnique);

export const EventModel = model("Event", EventSchema);
