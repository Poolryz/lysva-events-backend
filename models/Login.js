const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
	login: String,
	password: String,
});

module.exports = mongoose.model("Login", eventSchema);
