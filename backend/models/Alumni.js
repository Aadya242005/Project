import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  alumni: { type: Boolean, default: false },
  role: String,
  company: String,
  batch: String,
  image: String,
  linkedin: String,
  package: Number,
  course: String,
  gender: String,
  phone: String,
  placed: Boolean
});
const User = mongoose.model("User", userSchema);
export default User;
