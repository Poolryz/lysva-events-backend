import Event from "../models/Event.js";
import path from "path";

export const getEvents = async (req, res) => {
	try {
		const events = await Event.find();
		res.json(events);
	} catch (error) {
		res.status(500).json({ message: "Ошибка при получении мероприятий", error });
	}
};
export const createEvent = async (req, res) => {
	const { title, description, date, endDate, time, dateType, location, userId } = req.body;
	const imagePath = req.file ? path.posix.join('uploads', req.file.filename) : null;

	try {
		const newEvent = new Event({
			title,
			description,
			date,
			endDate,
			time,
			dateType,
			location,
			userId,
			image: imagePath, // Сохраняем путь к изображению
		});
		await newEvent.save();
		res.status(201).json(newEvent);
	} catch (error) {
		res.status(500).json({ message: "Ошибка при создании мероприятия", error });
	}
}

