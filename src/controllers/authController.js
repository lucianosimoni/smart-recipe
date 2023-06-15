import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/userModel.js";
import {
  emailInUse,
  invalidEmailOrPassword,
  invalidPasswordLength,
  missingBody,
  somethingInUse,
  usernameInUse,
} from "../utils/responseUtils.js";

export async function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return missingBody(res);
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return invalidEmailOrPassword(res);
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordValid) {
    return invalidEmailOrPassword(res);
  }
  delete user.hashedPassword;

  const token = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "7d",
  });
  const loggedUser = { ...user, token };

  return res.status(200).json({ loggedUser });
}

export async function userRegister(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return missingBody(res);
  }
  if (password.length < 6) {
    return invalidPasswordLength(res);
  }

  const hashedPassword = await bcrypt.hash(password, 15);
  const user = { username, email, hashedPassword };

  try {
    const registeredUser = await createUser(user);
    delete registeredUser.hashedPassword;
    const token = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "7d",
    });
    return res
      .status(201)
      .json({ registeredUser: { ...registeredUser, token } });
  } catch (error) {
    // MongoDB Duplicate Key Error
    if (error.code == 11000) {
      switch (Object.keys(error.keyPattern)[0]) {
        case "username":
          return usernameInUse(res);
        case "email":
          return emailInUse(res);
        default: // Handle unexpected key pattern
          return somethingInUse(res, error);
      }
    }
    console.log(
      "🔴 An unexpected Error happened while Registering the User (authController.js / userRegister)"
    );
    res.status(500).json(error);
  }
}
