import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: boolean;
};

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
  const mongoURI: string = process.env.MONGODB_URI!;

  if (connection.isConnected) {
    console.log("Already connected to DB!");
    return;
  }

  try {
    const result = await mongoose.connect(mongoURI);
    if (result?.connections[0]?.readyState) {
      connection.isConnected = true;
      console.log("Connected to DB Successfully!");
    }
  } catch (error) {
    throw `Error Connecting to Database: ${error}`;
  }
};

export default dbConnect;
