let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let routes = require("./routes");
let cors = require("cors");

let app = express();
app.use(
  cors({
    origin: "http://localhost:8080"
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect("mongodb://localhost/silma", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// API Routes
app.get("/", (req, res) => res.send("Hello World with Express"));
app.use("/api", routes);

// Launch app to listen to specified port
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Running Silma backend on port " + port);
});
