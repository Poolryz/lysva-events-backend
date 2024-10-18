const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
	title: String,
	description: String,
	date: Date,
	location: String,
	userId: String,
	image: String, // Добавляем поле для хранения пути к изображению
});

module.exports = mongoose.model("Event", eventSchema);
