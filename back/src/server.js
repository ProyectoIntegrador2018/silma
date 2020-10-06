import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { createRoutes } from "./routes";
import fileupload from "express-fileupload";
import config from "./config/config";

// In development use .env.local for environment variables
if (config.ENV !== "production") {
  require("dotenv").config({ path: ".env.local" });
}

// Api app configuration
const app = express();
app.use(fileupload());

app.use(
  cors({
    origin: config.CROSS_ORIGIN
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// When in production redirect everything not starting with 'api/*' to the static website
if (config.ENV === "production") {
  app.use(express.static(__dirname + "/public"));
  app.get(/^(?!.*(\/api\/)).*$/, (req, res) =>
    res.sendFile(__dirname + "/public/index.html")
  );
} else {
  app.use(express.static("public"));
}

// Connect to Mongoose and set connection variable
mongoose.connect(config.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// API Routes
const router = createRoutes();
app.use("/api", router);

// Launch app to listen to specified port
app.listen(config.PORT, () => {
  console.log(`Running Silma backend on port ${config.PORT}`);
});
