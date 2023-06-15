import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../services/mongoService.js";

export async function createProfile(profile) {
  const database = await connectToMongoDB();
  const profilesCollection = database.collection("Profiles");

  const result = await profilesCollection.insertOne(profile);
  const createdProfile = { ...profile, _id: result.insertedId };

  return createdProfile;
}

export async function getAllProfiles() {
  const database = await connectToMongoDB();
  const profilesCollection = database.collection("Profiles");

  const profiles = profilesCollection.find().toArray();

  return profiles;
}

export async function getProfileByUserId(userId) {
  const database = await connectToMongoDB();
  const profilesCollection = database.collection("Profiles");

  const profile = await profilesCollection.findOne({
    userId: new ObjectId(userId),
  });

  return profile;
}

export async function getProfileById(profileId) {
  const database = await connectToMongoDB();
  const profilesCollection = database.collection("Profiles");

  const profile = await profilesCollection.findOne({
    _id: new ObjectId(profileId),
  });

  return profile;
}

export async function updateProfileByUserId(userId, updatedProfile) {
  const database = await connectToMongoDB();
  const profilesCollection = database.collection("Profiles");

  const result = await profilesCollection.findOneAndUpdate(
    { userId: new ObjectId(userId) },
    { $set: updatedProfile },
    { returnDocument: "after" } // Returns the updated Profile
  );

  return result.value;
}

export async function deleteProfileByUserId(userId) {
  const database = await connectToMongoDB();
  const profilesCollection = database.collection("Profiles");

  const result = await profilesCollection.findOneAndDelete(
    { userId: new ObjectId(userId) },
    { returnDocument: "after" } // Returns the deleted Profile
  );

  return result.value;
}
