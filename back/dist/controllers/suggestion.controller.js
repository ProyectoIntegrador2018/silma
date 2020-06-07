"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeReadingChapters = exports.getSuggestionForFeedback = exports.deleteSuggestionAdmin = exports.getReadersWithoutSuggestion = exports.createSuggestionAdmin = exports.getTextSuggestions = exports.getAllSuggestionsFromReaderDashboard = exports.getSuggestionFromReaderDashboard = exports.getAllSuggestionsFromReader = exports.getSuggestionFromReader = exports.getSuggestion = exports.completeSuggestion = exports.acceptSuggestion = exports.rejectSuggestion = exports.changeSuggestionStatus = exports.calculateBetweenDatesPoints = exports.calculateParticiaptionPoints = exports.calculateReadingPoints = exports.calculateAgePoints = exports.calculateGenrePoints = exports.runAlgorithm = exports.addSuggestionSendEmail = exports.assignReaders = void 0;

var _reader = require("../models/reader.model");

var _suggestion = require("../models/suggestion.model");

var _text = require("../models/text.model");

var _mailSender = require("../utils/mailSender");

var _errors = require("../utils/errors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var assignReaders = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (text, amount) {
    var resultsAlgorithm = yield runAlgorithm(text);
    resultsAlgorithm = resultsAlgorithm.sort((a, b) => a.points < b.points ? 1 : -1);
    var selectedReaders = resultsAlgorithm.slice(0, amount);
    yield addSuggestionSendEmail(selectedReaders, text);
  });

  return function assignReaders(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.assignReaders = assignReaders;

var addSuggestionSendEmail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (selectedReaders, text) {
    for (var reader of selectedReaders) {
      var suggetionObj = {
        reader: reader.id,
        text: text._id,
        sentDate: new Date(),
        suggestionStatus: "Pending",
        score: reader.points
      };
      yield _suggestion.SuggestionModel.create(suggetionObj);
      var readerInfo = yield _reader.ReaderModel.findById(reader.id).populate("user");
      var plazoLectura;

      if (text.numberOfPages > 350) {
        plazoLectura = "cuatro semanas";
      } else {
        plazoLectura = "tres semanas";
      }

      var textEmails = yield _text.TextModel.findById(text._id).populate("genres");
      var listGenre = textEmails.genres.map(genre => genre.name);
      var email = {
        email: readerInfo.user.email,
        subject: "New Silma Reading Suggestion!"
      };
      yield (0, _mailSender.sendEmail)(email, 'new_suggestion', {
        numberOfPages: text.numberOfPages,
        genres: listGenre.join(" ,")
      });
    }
  });

  return function addSuggestionSendEmail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addSuggestionSendEmail = addSuggestionSendEmail;

var runAlgorithm = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (text) {
    var readers = yield _reader.ReaderModel.find().populate("user");
    var resultantReaders = [];

    for (var reader of readers) {
      var genrePoints = yield calculateGenrePoints(reader.preferences, text.genres);
      var agePoints = yield calculateAgePoints(reader.user.birthdate, text.ageRange);
      var readingPoints = yield calculateReadingPoints(reader.readingProficiency);
      var participationPoints = yield calculateParticiaptionPoints(reader.lastReview);
      var betweenDatesPoints = yield calculateBetweenDatesPoints(reader.readFrom, reader.readTill);
      var finalPoints = genrePoints + agePoints + readingPoints + participationPoints + betweenDatesPoints;
      var acceptedRequest = yield _suggestion.SuggestionModel.find({
        reader: reader._id,
        suggestionStatus: "Accepted"
      });
      var pendingRequest = yield _suggestion.SuggestionModel.find({
        reader: reader._id,
        suggestionStatus: "Pending"
      });
      var completedRequest = yield _suggestion.SuggestionModel.find({
        reader: reader._id,
        suggestionStatus: "Completed",
        text: text._id
      });

      if (agePoints != 0 && acceptedRequest.length === 0 && pendingRequest.length === 0 && completedRequest.length === 0 && text.writer.toString() != reader._id.toString()) {
        var resultReader = {
          id: reader._id,
          points: finalPoints
        };
        resultantReaders.push(resultReader);
      }
    }

    return resultantReaders;
  });

  return function runAlgorithm(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.runAlgorithm = runAlgorithm;

var calculateGenrePoints = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (userGenres, textGenres) {
    var similar = 0;

    for (var uGenre of userGenres) {
      if (textGenres.includes(uGenre)) {
        similar = similar + 1;
      }
    }

    if (similar === 1) {
      return 2;
    } else if (similar === 2) {
      return 6;
    } else if (similar === 3) {
      return 10;
    } else {
      return 0;
    }
  });

  return function calculateGenrePoints(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.calculateGenrePoints = calculateGenrePoints;

var calculateAgePoints = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (userBirthDate, textYears) {
    var today = new Date();
    var birthDate = new Date(userBirthDate);
    var UsersAge = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
      UsersAge = UsersAge - 1;
    }

    var arr = textYears.split(/-/g);

    if (arr[0] === "18+") {
      var bookMinAge = 18;
      var bookMaxAge = 1000;
    } else {
      var bookMinAge = parseInt(arr[0]);
      var bookMaxAge = parseInt(arr[1]);
    }

    if (UsersAge < bookMinAge) {
      return 0;
    }

    var earnedPoints = 7;

    if (UsersAge >= bookMinAge && UsersAge <= bookMaxAge) {
      return earnedPoints;
    }

    for (var i = 3; i >= 0; i--) {
      if (UsersAge <= bookMaxAge || bookMaxAge > 18) {
        return earnedPoints;
      }

      earnedPoints = earnedPoints - 2;
      bookMaxAge = bookMaxAge + 3;
    }
  });

  return function calculateAgePoints(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

exports.calculateAgePoints = calculateAgePoints;

var calculateReadingPoints = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (readingProficiency) {
    if (readingProficiency === "3 or less") {
      return 2;
    } else if (readingProficiency === "4 to 6") {
      return 1;
    } else {
      return 0;
    }
  });

  return function calculateReadingPoints(_x10) {
    return _ref6.apply(this, arguments);
  };
}();

exports.calculateReadingPoints = calculateReadingPoints;

var calculateParticiaptionPoints = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (participationDate) {
    var todaysDate = new Date();
    var months = todaysDate.getMonth() - participationDate.getMonth() + 12 * (todaysDate.getFullYear() - participationDate.getFullYear());

    if (months > 18) {
      return 2;
    } else if (months >= 6 && months <= 18) {
      return 1;
    }

    return 0;
  });

  return function calculateParticiaptionPoints(_x11) {
    return _ref7.apply(this, arguments);
  };
}();

exports.calculateParticiaptionPoints = calculateParticiaptionPoints;

var calculateBetweenDatesPoints = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (initialDate, finalDate) {
    var todaysDate = new Date();

    if (todaysDate <= finalDate && todaysDate >= initialDate) {
      return 1;
    } else {
      return 0;
    }
  });

  return function calculateBetweenDatesPoints(_x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}();

exports.calculateBetweenDatesPoints = calculateBetweenDatesPoints;

var changeSuggestionStatus = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (id, newStatus, previousStatus) {
    var suggestion = yield _suggestion.SuggestionModel.findById(id).populate("text");
    if (!suggestion) throw {
      error: "Suggestion with id: ".concat(id, " not found")
    };

    if (suggestion.suggestionStatus === previousStatus) {
      suggestion.suggestionStatus = newStatus;
      yield _suggestion.SuggestionModel.updateOne({
        _id: suggestion._id
      }, _objectSpread({
        suggestionStatus: newStatus
      }, suggestion._doc));
      return suggestion;
    } else {
      throw {
        error: "Suggestion status can't be updated to ".concat(newStatus, " when in ").concat(suggestion.suggestionStatus, " status")
      };
    }
  });

  return function changeSuggestionStatus(_x14, _x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();

exports.changeSuggestionStatus = changeSuggestionStatus;

var rejectSuggestion = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var suggestion = yield _suggestion.SuggestionModel.findById(id);
    var text = yield _text.TextModel.findById(suggestion.text);
    yield assignReaders(text, 1);
    var newSuggestion = yield changeSuggestionStatus(id, "Rejected", "Pending");
    return newSuggestion;
  }));
};

exports.rejectSuggestion = rejectSuggestion;

var acceptSuggestion = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var suggestion = yield changeSuggestionStatus(id, "Accepted", "Pending");
    return suggestion;
  }));
};

exports.acceptSuggestion = acceptSuggestion;

var completeSuggestion = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var suggestion = yield changeSuggestionStatus(id, "Completed", "Accepted");
    return suggestion;
  }));
};

exports.completeSuggestion = completeSuggestion;

var getSuggestion = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var suggestion = yield _suggestion.SuggestionModel.findById(id).populate("text");
    return suggestion;
  }));
};

exports.getSuggestion = getSuggestion;

var getSuggestionFromReader = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var suggestion = yield _suggestion.SuggestionModel.find({
      reader: id,
      suggestionStatus: "Pending"
    });
    return suggestion;
  }));
};

exports.getSuggestionFromReader = getSuggestionFromReader;

var getAllSuggestionsFromReader = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var suggestion = yield _suggestion.SuggestionModel.find({
      reader: id
    });
    return suggestion;
  }));
};

exports.getAllSuggestionsFromReader = getAllSuggestionsFromReader;

var getSuggestionFromReaderDashboard = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var reader = yield _reader.ReaderModel.find({
      user: id
    });
    var suggestion = yield _suggestion.SuggestionModel.find({
      $or: [{
        reader: reader,
        suggestionStatus: "Accepted"
      }, {
        reader: reader,
        suggestionStatus: "Pending"
      }]
    });
    if (suggestion === undefined) return false;else return suggestion[0];
  }));
};

exports.getSuggestionFromReaderDashboard = getSuggestionFromReaderDashboard;

var getAllSuggestionsFromReaderDashboard = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var reader = yield _reader.ReaderModel.find({
      user: id
    });
    var suggestions = yield _suggestion.SuggestionModel.find({
      reader: reader
    });
    return suggestions;
  }));
};

exports.getAllSuggestionsFromReaderDashboard = getAllSuggestionsFromReaderDashboard;

var getTextSuggestions = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var suggestion = yield _suggestion.SuggestionModel.find({
      text: id
    }).populate("text");
    return suggestion;
  }));
};

exports.getTextSuggestions = getTextSuggestions;

var createSuggestionAdmin = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    try {
      var reader = [{
        id: request.body.reader_id,
        points: 25
      }];
      var text = {
        _id: request.body.book_id,
        numberOfPages: request.body.numberOfPages
      };
      yield addSuggestionSendEmail(reader, text);
      return {
        status: "success"
      };
    } catch (err) {
      return err;
    }
  }));
};

exports.createSuggestionAdmin = createSuggestionAdmin;

var getReadersWithoutSuggestion = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var text = yield _text.TextModel.findById(id);
    var textWriter = [{
      reader: text.writer
    }];
    var completedBooks = yield _suggestion.SuggestionModel.find({
      suggestionStatus: "Completed",
      text: id
    });
    var acceptedRequest = yield _suggestion.SuggestionModel.find({
      suggestionStatus: "Accepted"
    });
    var pendingRequest = yield _suggestion.SuggestionModel.find({
      suggestionStatus: "Pending"
    });
    var readers = yield _reader.ReaderModel.find().populate("user").populate("preferences");
    var occupiedReaders = [...acceptedRequest, ...pendingRequest, ...completedBooks, ...textWriter];
    var idOccupied = [];
    occupiedReaders.forEach(element => {
      idOccupied.push(element.reader.toString());
    });
    var finalArr = readers.filter(function (item) {
      return idOccupied.indexOf(item._id.toString()) === -1;
    });
    return finalArr;
  }));
};

exports.getReadersWithoutSuggestion = getReadersWithoutSuggestion;

var deleteSuggestionAdmin = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;

    _suggestion.SuggestionModel.findOne({
      _id: id
    }).deleteOne().exec();
  }));
};

exports.deleteSuggestionAdmin = deleteSuggestionAdmin;

var getSuggestionForFeedback = (request, response) => {
  (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
    var {
      id
    } = request.params;
    var suggestion = yield _suggestion.SuggestionModel.findById(id);
    return suggestion;
  }));
};

exports.getSuggestionForFeedback = getSuggestionForFeedback;

var changeReadingChapters = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(function* (request, response) {
    (0, _errors.send)(response, /*#__PURE__*/_asyncToGenerator(function* () {
      var {
        id
      } = request.params;
      var suggestion = request.body;
      yield _suggestion.SuggestionModel.updateOne({
        _id: id
      }, {
        readingChapters: suggestion.readingChapters
      });
      return suggestion;
    }));
  });

  return function changeReadingChapters(_x17, _x18) {
    return _ref23.apply(this, arguments);
  };
}();

exports.changeReadingChapters = changeReadingChapters;