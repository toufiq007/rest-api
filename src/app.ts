import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./db/dbConnection";
dotenv.config();

connectDb();

const app:Application = express();

app.use(
  cors({
    credentials: true,
  })
);
// using our middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

// port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
