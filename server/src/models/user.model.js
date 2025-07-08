import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  username: {
    type: String,
    unique:true,
    required: [true, "Your password is required"],
  },
  googleId: { type: String, unique: true },
  profilePicture: { type: String },

  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  verified:{
    type:Boolean,
    default:false 
  }
});



export const User = mongoose.model("User", userSchema);
