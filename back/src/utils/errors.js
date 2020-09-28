import PrettyError from "pretty-error";
import mongoose from "mongoose";

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
