const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
	title: String,
	description: String,
	date: Date,
	location: String,
	userId: String,
});

module.exports = mongoose.model("Event", eventSchema);
