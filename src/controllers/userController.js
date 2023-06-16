import {
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
} from "../models/userModel.js";
import {
  invalidEmailFormat,
  missingBody,
  missingParams,
  userEmailNotFound,
  userIdNotFound,
} from "../utils/responseUtils.js";
import { validEmail } from "../utils/validationUtils.js";

// 🟢 User Creation is in the authController.js

export async function userGet(req, res) {
  const { userId, userEmail } = req.query;

  if (userId) {
    try {
      const user = await getUserById(userId);
      if (!user) {
        return userIdNotFound(res);
      }
      delete user.hashedPassword;
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while getting user by id." });
    }
    return;
  }

  if (userEmail) {
    try {
      const user = await getUserByEmail(userEmail);
      if (!user) {
        return userEmailNotFound(res);
      }
      delete user.hashedPassword;
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while getting user by email." });
    }
    return;
  }

  // Retornar Todos os Users
  try {
    const users = await getAllUsers();
    // FIXME: Não pode retornar hashedPassword!
    return res.json({ users });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while getting all users." });
  }
}

export async function userUpdate(req, res) {
  const { userId } = req.params;
  const user = req.body;

  if (!userId) {
    return missingParams(res);
  }
  if (!user) {
    return missingBody(res);
  }

  // Validates Email if there is one 📧
  if (user.hasOwnProperty("email")) {
    if (!validEmail(user.email)) return invalidEmailFormat(res);
  }

  try {
    const updatedUser = await updateUser(userId, user);
    if (!updatedUser) {
      return userIdNotFound(res);
    }
    delete updatedUser.hashedPassword;
    return res.status(201).json({ updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user by its id." });
  }
}

export async function userDelete(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return missingParams(res);
  }

  try {
    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
      return userIdNotFound(res);
    }
    delete deletedUser.hashedPassword;
    return res.status(201).json({ deletedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user by its id." });
  }
}
