const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
	title: String,
	description: String,
	date: Date,
	location: String,
	createdBy: String, // имя или ID пользователя
});

module.exports = mongoose.model("Event", eventSchema);
