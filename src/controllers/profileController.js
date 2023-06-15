import { ObjectId } from "bson";
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  getProfileByUserId,
  updateProfileByUserId,
  deleteProfileByUserId,
} from "../models/profileModel.js";
import {
  missingBody,
  missingParams,
  profileIdNotFound,
  profileUserIdNotFound,
  userAlreadyHasProfile,
} from "../utils/responseUtils.js";

export async function profileCreate(req, res) {
  const profile = req.body;

  if (
    !profile.userId ||
    !(profile.favoriteCuisines instanceof Array) ||
    !(profile.dietaryPreferences instanceof Array) ||
    !(profile.ingredientPreferences instanceof Array) ||
    !profile.cookingExperience ||
    !(profile.foodAllergies instanceof Array) ||
    !(profile.inventory instanceof Array)
  ) {
    return missingBody(res);
  }

  profile.userId = new ObjectId(profile.userId);

  try {
    const createdProfile = await createProfile(profile);
    if (!createdProfile) {
      console.log(
        "⚠️🟠 there is no createdProfile object. Object is:",
        createdProfile
      );
      throw new Error(createdProfile);
    }
    return res.status(201).json({ createdProfile });
  } catch (error) {
    // MongoDB Duplicate Key Error
    if (error.code == 11000) {
      switch (Object.keys(error.keyPattern)[0]) {
        case "userId":
          return userAlreadyHasProfile(res);
        default: // Handle unexpected key pattern
          return somethingInUse(res, error);
      }
    }
    console.log("⚠️🔴 An error occurred while creating Profile by UserId.");
    res
      .status(500)
      .json({ error: "An error occurred while updating Profile by UserId." });
  }
}

export async function profileGet(req, res) {
  const { userId, profileId } = req.query;

  if (userId) {
    try {
      const profile = await getProfileByUserId(userId);
      if (!profile) {
        return profileUserIdNotFound(res);
      }
      return res.status(200).json({ profile });
    } catch (error) {
      console.log("⚠️🔴 An error occurred while getting Profile by UserId.");
      res
        .status(500)
        .json({ error: "An error occurred while getting Profile by UserId." });
    }
    return;
  }

  if (profileId) {
    try {
      const profile = await getProfileById(profileId);
      if (!profile) {
        return profileIdNotFound(res);
      }
      return res.status(200).json({ profile });
    } catch (error) {
      console.log("⚠️🔴 An error occurred while getting Profile by id.");
      res
        .status(500)
        .json({ error: "An error occurred while getting Profile by id." });
    }
    return;
  }

  // Return all the Profiles
  try {
    const profiles = await getAllProfiles();
    return res.json({ profiles });
  } catch (error) {
    console.log("⚠️🔴 An error occurred while getting all Profiles.");
    res
      .status(500)
      .json({ error: "An error occurred while getting all Profiles." });
  }
}

export async function profileUpdate(req, res) {
  const { userId } = req.params;
  const profile = req.body;

  if (!userId) {
    return missingParams(res);
  }
  if (!Object.keys(profile).length) {
    return missingBody(res);
  }

  try {
    const updatedProfile = await updateProfileByUserId(userId, profile);
    if (!updatedProfile) {
      return profileUserIdNotFound(res);
    }
    return res.status(201).json({ updatedProfile });
  } catch (error) {
    console.log("⚠️🔴 An error occurred while getting Profile by UserId.");
    res
      .status(500)
      .json({ error: "An error occurred while updating Profile by UserId." });
  }
}

export async function profileDelete(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return missingParams(res);
  }

  try {
    const deletedProfile = await deleteProfileByUserId(userId);
    if (!deletedProfile) {
      return profileUserIdNotFound(res);
    }
    return res.status(201).json({ deletedProfile });
  } catch (error) {
    console.log("⚠️🔴 An error occurred while getting Profile by UserId.");
    res
      .status(500)
      .json({ error: "An error occurred while updating profile by UserId." });
  }
}
