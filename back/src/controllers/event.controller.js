import * as EventLogic from "@/logics/event.logic";
import { send } from "@/utils/errors";

export const searchEvent = (request, response) => {
  send(response, async () => {
    const query = request.query;
    return await EventLogic.searchEvent(query);
  });
};

export const getEventById = (request, response) => {
  send(response, async () => {
    const id = request.params.id;
    return await EventLogic.getEventById(id);
  });
};

export const createEvent = (request, response) => {
  send(response, async () => {
    const event = request.body;
    return await EventLogic.createEvent(event);
  });
};

export const updateEvent = (request, response) => {
  send(response, async () => {
    const event = request.body;
    const id = request.params.id;
    return await EventLogic.updateEvent(id, event);
  });
};

export const deleteEvent = (request, response) => {
  send(response, async () => {
    const id = request.params.id;
    return await EventLogic.deleteEvent(id);
  });
};
