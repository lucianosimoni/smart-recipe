import express from "express";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import profileRouter from "./routers/profileRouter.js";
import authenticate from "./middleware/authenticate.js";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", authenticate, userRouter);
app.use("/profile", authenticate, profileRouter);

app.listen(3000, () => {
  console.log("🚀 Server is running at http://localhost:3000/");
});
