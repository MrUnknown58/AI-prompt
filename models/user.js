import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: "string",
    required: [true, "Email is Required!"],
    unique: [true, "Email Already Exists!"],
  },
  username: {
    type: "string",
    required: [true, "Username is Required!"],
    unique: [true, "Email Already Exists!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username Invalid, It should contain 8-20 alphanumeric characters and be unique",
    ],
  },
  image: { type: "string" },
});
const User = models.User || model("User", UserSchema);

export default User;
