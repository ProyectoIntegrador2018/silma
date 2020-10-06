"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routesErrorHandler;

var _messages = _interopRequireDefault(require("../utils/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routesErrorHandler(app) {
  app.use(notFound);
  app.use(errorHandler);
}

function notFound(req, res, next) {
  var error = new Error("Not Found");
  error.status = 404;
  next(error);
}

function errorHandler(error, req, res, next) {
  var status = error.status || 500;

  var message = error.message || _messages.default.SomethingWentWrong();

  res.status(status).json({
    message
  });
}