import PrettyError from 'pretty-error';

// Sends a successful or failed response to an http request.
export const send = async (response, callback) => {
  try {
    const data = await callback();
    response.send(data);
  } catch (error) {
    console.log(error);
    const pe = new PrettyError();
    const renderedError = pe.render(error);
    console.log(renderedError);
    response.status(404).send({ status: "fail", ...error });
  }
};
