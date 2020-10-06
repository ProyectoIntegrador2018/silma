"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _routes = require("./routes");

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _config = _interopRequireDefault(require("./config/config"));

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

var _dataInit = require("./scripts/dataInit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In development use .env.local for environment variables
if (_config.default.ENV !== "production") {
  require("dotenv").config({
    path: ".env.local"
  });
} // Api app configuration


var app = (0, _express.default)();
app.use((0, _expressFileupload.default)());
app.use((0, _cors.default)({
  origin: _config.default.CROSS_ORIGIN
}));
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json()); // When in production redirect everything not starting with 'api/*' to the static website

if (_config.default.ENV === "production") {
  app.use(_express.default.static(__dirname + "/public"));
  app.get(/^(?!.*(\/api\/)).*$/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
} else {
  app.use(_express.default.static("public"));
} // Connect to Mongoose and set connection variable


_mongoose.default.connect(_config.default.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose.default.connection; // Added check for DB connection

if (!db) console.log("Error connecting db");else console.log("Db connected successfully");
if (_config.default.ENV !== "production") (0, _dataInit.createEverything)().catch(err => console.error(err)); // API Routes

var router = (0, _routes.createRoutes)(); // Attach error handlers to Express app

app.use("/api", router);
(0, _errorHandler.default)(app); // Launch app to listen to specified port

app.listen(_config.default.PORT, () => {
  console.log("Running Silma backend on port ".concat(_config.default.PORT));
});