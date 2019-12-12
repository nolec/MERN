import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
//====================================================
import "./db";
import userRouter from "./routers/userRoute";
import profileRouter from "./routers/profileRoute";
//====================================================
const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//====================================================
app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
