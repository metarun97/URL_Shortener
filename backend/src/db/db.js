/* Imported elements */
import mongoose from "mongoose";


/* ConnectDb function */
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb✅");
  } catch (error) {
    console.log("Error to connected MongoDb✅", error);
  }
}

export default connectToDb;
