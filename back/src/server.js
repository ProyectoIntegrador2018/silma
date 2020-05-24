import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { createRoutes } from "./routes";
import jwt from "./utils/jwt";
import fileupload from "express-fileupload";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' });
}

const mongoUrl = process.env.MONGODB_URI;
const enabledCorsOrigins = process.env.CROSS_ORIGIN;
const port = process.env.PORT || 3000;

// Api app configuration
const app = express();
app.use(fileupload());

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
app.use(fileupload());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public'));
  app.get(/^(?!.*(\/api\/)).*$/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
} else {
  app.use(express.static('public'));
}

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
app.listen(port, () => {
  console.log(`Running Silma backend on port ${port}`);
});
