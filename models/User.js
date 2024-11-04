import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, },
    organization: { type: String },
});

const User = mongoose.model("User", userSchema, "logins");

export default User;
