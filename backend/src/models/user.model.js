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
  email: {
    type: String,
    required: true
  },
}, { timestamps: true })


/* user Model created */
const userModel = mongoose.model("user", userSchema);

export default userModel;
