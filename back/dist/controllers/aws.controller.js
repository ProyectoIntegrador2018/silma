"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImage = exports.uploadDocument = exports.getDocument = void 0;

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var AWS = require("aws-sdk"); //Funcion que obtiene un documento de AWS S3


var getDocument = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (id) {
    var params = {
      Bucket: _config.default.AWS_BUCKET + "/Texts",
      Key: id + ".md"
    };
    var s3 = new AWS.S3();
    return new Promise((resolve, reject) => {
      s3.getObject(params, function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(data);
      });
    });
  });

  return function getDocument(_x) {
    return _ref.apply(this, arguments);
  };
}(); //Funcion que sube un documento a AWS S3


exports.getDocument = getDocument;

var uploadDocument = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (id, data) {
    var s3 = new AWS.S3({
      params: {
        Bucket: _config.default.AWS_BUCKET + "/Texts",
        Key: "",
        Body: ""
      }
    });
    var params = {
      Key: id,
      Body: data
    };
    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
    });
  });

  return function uploadDocument(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); //Funcion que obtiene una imagen de AWS S3


exports.uploadDocument = uploadDocument;

var getImage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (id) {
    var params = {
      Bucket: _config.default.AWS_BUCKET + "/Images",
      Key: id + ".png"
    };
    var s3 = new AWS.S3({
      credentials: {
        secretAccessKey: _config.default.AWS_SECRET_ACCESS_KEY,
        accessKeyId: _config.default.AWS_ACCESS_KEY_ID
      }
    });
    return new Promise((resolve, reject) => {
      s3.getObject(params, function (err, data) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  });

  return function getImage(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getImage = getImage;