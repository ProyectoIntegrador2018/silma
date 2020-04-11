import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { createRoutes } from "./routes";
const jwt = require('./utils/jwt');

const mongoUrl = "mongodb://localhost/silma";
const enabledCorsOrigins = "http://localhost:8080";
const defaultPort = 3000;

// Api app configuration
const app = express();
app.use(
  cors({
    origin: enabledCorsOrigins
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(jwt());

// Connect to Mongoose and set connection variable
mongoose.connect(mongoUrl, {
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
const port = process.env.PORT || defaultPort;
app.listen(port, () => {
  console.log(`Running Silma backend on port ${port}`);
});
