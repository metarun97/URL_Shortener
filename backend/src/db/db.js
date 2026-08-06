/* Imported elements */
import mongoose from "mongoose";


/* ConnectDb function */
const connectToDb = async (uri = process.env.MONGO_URI) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDb database connected Successfully");

  } catch (error) {
    console.error("Error connecting to MongoDb Database", error);
  }
}

export default connectToDb;
