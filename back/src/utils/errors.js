// Sends a successful or failed response to an http request.
export const send = async (response, callback) => {
  try {
    const data = await callback();
    response.send(data);
  } catch (error) {
    response.status(404).send({ status: "fail", ...error });
  }
};
