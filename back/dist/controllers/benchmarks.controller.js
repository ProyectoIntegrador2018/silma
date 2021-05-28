"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getText = exports.getTimeBenchmarksByWriter = exports.getTimeBenchmarks = void 0;

var _errors = require("../utils/errors");

var _text = require("../models/text.model");

var _user = require("../models/user.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var initialPhases = {
  1: {
    max: Number.MIN_VALUE,
    min: Number.MAX_VALUE,
    total: 0
  },
  2: {
    max: Number.MIN_VALUE,
    min: Number.MAX_VALUE,
    total: 0
  },
  3: {
    max: Number.MIN_VALUE,
    min: Number.MAX_VALUE,
    total: 0
  },
  4: {
    max: Number.MIN_VALUE,
    min: Number.MAX_VALUE,
    total: 0
  },
  5: {
    max: Number.MIN_VALUE,
    min: Number.MAX_VALUE,
    total: 0
  },
  6: {
    max: Number.MIN_VALUE,
    min: Number.MAX_VALUE,
    total: 0
  },
  7: {
    max: Number.MIN_VALUE,
    min: Number.MAX_VALUE,
    total: 0
  },
  8: {
    max: Number.MIN_VALUE,
    min: Number.MAX_VALUE,
    total: 0
  },
  9: {
    max: Number.MIN_VALUE,
    min: Number.MAX_VALUE,
    total: 0
  },
  overall: {
    max: Number.MIN_VALUE,
    min: Number.MAX_VALUE,
    total: 0
  }
}; // Response with all texts with their genres.

var getTimeBenchmarks = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var texts = yield _text.TextModel.find().populate("genres").populate("writer");

    var phases = _objectSpread({}, initialPhases);

    texts.forEach(text => {
      var thisDate = new Date(text.createdAt);

      for (var i = 1; i < 9; i++) {
        var nextDate = text.datesPerPhase[i + 1] !== null ? new Date(text.datesPerPhase[i + 1]) : null;
        console.log(nextDate);
        var timeInPhase = getHours(thisDate, nextDate);
        phases[i] = {
          min: phases[i].min > timeInPhase ? timeInPhase !== -1 ? timeInPhase : phases[i].min : phases[i].min,
          max: phases[i].max < timeInPhase ? timeInPhase !== -1 ? timeInPhase : phases[i].max : phases[i].max,
          total: timeInPhase !== -1 ? timeInPhase + phases[i].total : phases[i].total
        };
        thisDate = nextDate;
      }

      var startDate = new Date(text.createdAt);
      var endDate = text.datesPerPhase[9] !== null ? new Date(text.datesPerPhase[9]) : null;
      var totalTime = getHours(startDate, endDate);
      phases['overall'] = {
        min: phases['overall'].min > totalTime ? totalTime !== -1 ? totalTime : phases['overall'].min : phases['overall'].min,
        max: phases['overall'].max < totalTime ? totalTime !== -1 ? totalTime : phases['overall'].max : phases['overall'].max,
        total: totalTime !== -1 ? totalTime + phases['overall'].total : phases['overall'].total
      };
    });

    for (var i = 1; i < 9; i++) {
      phases[i] = _objectSpread({}, phases[i], {
        avg: phases[i].total / getLengthOfNotNull(texts, i + 1)
      });
    }

    phases['overall'] = _objectSpread({}, phases['overall'], {
      avg: phases['overall'].total / getLengthOfNotNull(texts, 9)
    });
    console.log(phases);
    return phases;
  }));
};

exports.getTimeBenchmarks = getTimeBenchmarks;

var getTimeBenchmarksByWriter = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var texts = yield _text.TextModel.find().populate("genres").populate("writer");
    var phasesByWriters = {};
    console.log(initialPhases);
    texts.forEach(text => {
      var thisDate = new Date(text.createdAt);
      var writer = text.writer.pseudonym;
      if (!phasesByWriters[writer]) phasesByWriters[writer] = _objectSpread({}, initialPhases);

      for (var i = 1; i < 9; i++) {
        var nextDate = text.datesPerPhase[i + 1] !== null ? new Date(text.datesPerPhase[i + 1]) : null;
        var timeInPhase = getHours(thisDate, nextDate);
        phasesByWriters[writer][i] = {
          min: phasesByWriters[writer][i].min > timeInPhase && timeInPhase !== -1 ? timeInPhase : phasesByWriters[writer][i].min,
          max: phasesByWriters[writer][i].max < timeInPhase && timeInPhase !== -1 ? timeInPhase : phasesByWriters[writer][i].max,
          total: timeInPhase !== -1 ? timeInPhase + phasesByWriters[writer][i].total : phasesByWriters[writer][i].total
        };
        thisDate = nextDate;
      }

      var startDate = new Date(text.createdAt);
      var endDate = text.datesPerPhase[9] !== null ? new Date(text.datesPerPhase[9]) : null;
      var totalTime = getHours(startDate, endDate);
      phasesByWriters[writer]['overall'] = {
        min: phasesByWriters[writer]['overall'].min > totalTime && totalTime !== -1 ? totalTime : phasesByWriters[writer]['overall'].min,
        max: phasesByWriters[writer]['overall'].max < totalTime && totalTime !== -1 ? totalTime : phasesByWriters[writer]['overall'].max,
        total: totalTime !== -1 ? totalTime + phasesByWriters[writer]['overall'].total : phasesByWriters[writer]['overall'].total
      };
      console.log(phasesByWriters);
    });
    Object.keys(phasesByWriters).forEach((key, index) => {
      var writerPhase = phasesByWriters[key];
      var textsWriter = texts.map(text => text.writer.pseudonym == key ? text : undefined);

      for (var i = 1; i < 9; i++) {
        writerPhase[i] = _objectSpread({}, writerPhase[i], {
          avg: writerPhase[i].total / getLengthOfNotNull(textsWriter, i + 1)
        });
      }

      writerPhase['overall'] = _objectSpread({}, writerPhase['overall'], {
        avg: writerPhase['overall'].total / getLengthOfNotNull(textsWriter, 9)
      });
    });
    return phasesByWriters;
  }));
}; // Response with a particular text based on its id.


exports.getTimeBenchmarksByWriter = getTimeBenchmarksByWriter;

var getText = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var reader = yield _text.TextModel.find({
      _id: id
    }).populate("genres");
    return reader;
  }));
};

exports.getText = getText;

var getHours = (date1, date2) => {
  if (date1 !== null && date2 !== null) {
    var milliseconds = Math.abs(date2 - date1);
    return milliseconds / 36e5;
  }

  return -1;
};

var getLengthOfNotNull = (texts, phase) => {
  var length = 0;
  texts.forEach(text => {
    if (text && text.datesPerPhase[phase] !== null) length++;
  });
  return length;
};