"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNullOrUndefinedOrEmpty = isNullOrUndefinedOrEmpty;

function isNullOrUndefinedOrEmpty(value) {
  var isNullOrUndefined = value === null || value === undefined;
  var isEmpty = typeof value === "string" ? value === "" : false;
  return isNullOrUndefined || isEmpty;
}