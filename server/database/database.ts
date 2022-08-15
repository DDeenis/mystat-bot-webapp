import mongoose from "mongoose";
import { IUser, UserModel } from "./entity/User.js";

export const connectMongo = async (connectionString: string): Promise<void> => {
  await mongoose.connect(connectionString, (err) =>
    console.log(err ? err : "Mongoose is connected")
  );
};

export const getUserByChatId = async (
  chatId: number
): Promise<IUser | undefined> => {
  await ensureConnection();

  const user = await UserModel.findOne({ chatId });
  return user?.toObject();
};

export const isUserExist = async (chatId: number): Promise<boolean> => {
  try {
    const result = await getUserByChatId(chatId);
    return Boolean(result);
  } catch (error) {
    console.log(error);
  }

  return false;
};

const ensureConnection = async () => {
  const connectionString = process.env?.MONGO_CONNECTION;

  if (!connectionString) {
    throw new Error("Connection string is not provided");
  }

  if (mongoose.connections.length < 1) {
    await connectMongo(connectionString);
  }
};
