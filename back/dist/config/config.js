"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var config = Object.freeze({
  MONGO_URL: process.env.MONGODB_URI || "mongodb://localhost:27017,127.0.0.1:27018/silma?replicaSet=rs0",
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  CROSS_ORIGIN: process.env.CROSS_ORIGIN || "*",
  SECRET_JWT: process.env.SECRET_JWT || "secret",
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_USER: process.env.EMAIL_USER,
  AWS_BUCKET: process.env.AWS_BUCKET
});
var _default = config;
exports.default = _default;