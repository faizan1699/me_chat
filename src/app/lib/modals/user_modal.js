import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
    email_verifiy_token: { type: String },
    email_verifiy_token_exp: { type: Date },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
