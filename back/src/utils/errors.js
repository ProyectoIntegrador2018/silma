import PrettyError from "pretty-error";
import mongoose from "mongoose";

export class SilmaError extends Error {
  /**
   *
   * @param {number} status
   * @param {string} message
   */
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Sends a successful or failed response to an http request.
export const send = async (response, callback) => {
  const session = await mongoose.connection.startSession();
  try {
    await session.withTransaction(async () => {
      const data = await callback(session);
      response.send(data);
    });
  } catch (error) {
    console.log(error);
    const pe = new PrettyError();
    const renderedError = pe.render(error);
    console.log(renderedError);
    const message = error.message || "Internal server error";
    const status = error.status || 500;
    response.status(status).send({ status: "fail", message, ...error });
  }
  session.endSession();
};

export function handleSyncRequest(callback, next) {
  try {
    callback();
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}
