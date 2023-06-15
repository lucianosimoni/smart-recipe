import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../services/mongoService.js";

export async function createUser(user) {
  const database = await connectToMongoDB();
  const usersCollection = database.collection("Users");

  const result = await usersCollection.insertOne(user);
  const createdUser = { ...user, _id: result.insertedId };

  return createdUser;
}

export async function getAllUsers() {
  const database = await connectToMongoDB();
  const usersCollection = database.collection("Users");

  const users = usersCollection.find().toArray();

  return users;
}

export async function getUserByEmail(userEmail) {
  const database = await connectToMongoDB();
  const usersCollection = database.collection("Users");

  const user = await usersCollection.findOne({ email: userEmail });

  return user;
}

export async function getUserById(userId) {
  const database = await connectToMongoDB();
  const usersCollection = database.collection("Users");

  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  return user;
}

export async function updateUser(userId, updatedUser) {
  const database = await connectToMongoDB();
  const usersCollection = database.collection("Users");

  const result = await usersCollection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    { $set: updatedUser },
    { returnDocument: "after" } // Returns the updated User
  );

  return result.value;
}

export async function deleteUser(userId) {
  const database = await connectToMongoDB();
  const usersCollection = database.collection("Users");

  const result = await usersCollection.findOneAndDelete(
    { _id: new ObjectId(userId) },
    { returnDocument: "after" } // Returns the deleted User
  );

  return result.value;
}
