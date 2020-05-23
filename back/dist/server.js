"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _routes = require("./routes");

var _jwt = _interopRequireDefault(require("./utils/jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoUrl = process.env.MONGODB_URI;
var enabledCorsOrigins = process.env.CROSS_ORIGIN;
var port = process.env.PORT || 3000; // Api app configuration

var app = (0, _express.default)();
app.use((0, _cors.default)({
  origin: enabledCorsOrigins
}));
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use((0, _jwt.default)());

if (process.env.NODE_ENV === 'production') {
  app.use(_express.default.static(__dirname + '/public'));
  app.get(/^(?!.*(\/api\/)).*$/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
} else {
  app.use(_express.default.static('public'));
} // Connect to Mongoose and set connection variable


_mongoose.default.connect(mongoUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose.default.connection; // Added check for DB connection

if (!db) console.log("Error connecting db");else console.log("Db connected successfully"); // API Routes

var router = (0, _routes.createRoutes)();
app.use("/api", router); // Launch app to listen to specified port

app.listen(port, () => {
  console.log("Running Silma backend on port ".concat(port));
});