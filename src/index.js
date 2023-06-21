import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import profileRouter from "./routers/profileRouter.js";
import authenticate from "./middleware/authenticate.js";
import serverAddress from "./utils/addressUtils.js";

dotenv.config();

const whitelist = process.env.WHITELIST.split(",");
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(`🔴⚠️ Not allowed by CORS from origin: ${origin}`, false);
  },
};

const app = express();
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", authenticate, userRouter);
app.use("/profile", authenticate, profileRouter);

app.listen(3000, () => {
  console.log(`🚀 CORS-enabled Web Server is running at ${serverAddress()}`);
});
