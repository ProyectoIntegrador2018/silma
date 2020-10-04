import Messages from "../utils/messages";

export default function routesErrorHandler(app) {
  app.use(notFound);
  app.use(errorHandler);
}

function notFound(req, res, next) {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
}

function errorHandler(error, req, res, next) {
  const status = error.status || 500;
  const message = error.message || Messages.SomethingWentWrong();
  res.status(status).json({ message });
}
