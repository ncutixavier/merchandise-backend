import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import routes from "./routes/index.js";
import formData from "express-form-data";
import passport from "passport";
import session from "express-session";

import "dotenv/config";
// import "./config/passport";

const app = express();

const port = process.env.PORT;
const mode = process.env.NODE_ENV || "development";

try {
  if (mode === "development") {
    mongoose
      .connect(process.env.DEVELOPMENT_DB, { useNewUrlParser: true })
      .then((res) => {
        console.log("DEV DB CONNECTED");
      });
  } else if (mode === "test") {
    mongoose
      .connect(process.env.TEST_DB, { useNewUrlParser: true })
      .then((res) => {
        console.log("TEST DB CONNECTED");
      });
  } else if (mode === "production") {
    mongoose
      .connect(process.env.PRODUCTION_DB, { useNewUrlParser: true })
      .then((res) => {
        console.log("PROD DB CONNECTED");
      });
  }
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(formData.parse());
app.use(morgan("tiny"));
// app.set("view engine", "ejs");
// app.engine("ejs", require("ejs").__express);
app.use(cors());

app.use(
  session({
    secret: "SECRETE",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ message: "Merchandise API" });
  // res.render("index");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/", routes);
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

export default app;
