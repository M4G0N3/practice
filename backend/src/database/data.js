import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log(
      `Mongo DB Connected !! DB HOST ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("DB Connection error: ", error);
    prcess.exit();
  }
};

export default connectDB;
