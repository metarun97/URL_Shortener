/* Imported elements */
import mongoose from "mongoose";


/* user Schema created */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  }
}, { timestamps: true })


/* user Model created */
const userModel = mongoose.model("user", userSchema);


export default userModel;
