"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxLengthRule = exports.minLengthRule = exports.rangeRule = exports.validateURL = exports.validatePhone = exports.validateEmail = void 0;

// Checks whether an email is valid or not
var validateEmail = email => {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

exports.validateEmail = validateEmail;

var validatePhone = phone => {
  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return regex.test(phone);
};

exports.validatePhone = validatePhone;

var validateURL = url => {
  try {
    new URL(url);
  } catch (_) {
    return false;
  }

  return true;
};

exports.validateURL = validateURL;

var rangeRule = (min, max) => {
  return entry => entry.length >= min && entry.length <= max;
};

exports.rangeRule = rangeRule;

var minLengthRule = min => {
  return entry => entry.length >= min;
};

exports.minLengthRule = minLengthRule;

var maxLengthRule = max => {
  return entry => entry.length <= max;
};

exports.maxLengthRule = maxLengthRule;