import { EventModel } from "@/models/event.model";
import * as EventValidation from "../validations/event.validation";

export async function searchEvent(query) {
  const event = await EventModel.find();
  return event;
}

export async function getEventById(eventId) {
  const event = await EventModel.findById(eventId);
  return event;
}

export async function createEvent(event) {
  const newEventModel = new EventModel(event);
  const newEvent = await newEventModel.save();
  return newEvent;
}

export async function updateEvent(id, event) {
  const eventModel = await EventModel.findById(id);
  const updatedEventModel = Object.assign(eventModel, event);
  const updatedEvent = await updatedEventModel.save();

  return updatedEvent;
}

export async function deleteEvent(id) {
  const eventToDelete = await EventModel.findById(id);
  
  // Validate genre delete
  await EventValidation.onDeleteValidations(eventToDelete);

  const deletedEvent = await eventToDelete.deleteOne();

  return deletedEvent;
}
