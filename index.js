const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const mongoose = require("mongoose");
const Event = require("./models/Event");
const Login = require("./models/Login");

app.use(cors());

// Подключаемся к MongoDB
mongoose
	.connect(
		"mongodb+srv://savinovdanil:120698daOKLICKMQVGYJkb@cluster0.g1ybj.mongodb.net/lysva-events?retryWrites=true&w=majority&appName=Cluster0",
	)
	.then(() => console.log("MongoDB подключена"))
	.catch((err) => console.log("Ошибка подключения к MongoDB:", err));

//Создание маршрутов (routes)
app.use(express.json()); // Для обработки JSON данных
app.post("/events", async (req, res) => {
	const { title, description, date, location, createdBy } = req.body;

	try {
		const newEvent = new Event({
			title,
			description,
			date,
			location,
			createdBy,
		});
		await newEvent.save();
		res.status(201).json(newEvent);
	} catch (error) {
		res.status(500).json({ message: "Ошибка при создании мероприятия", error });
	}
});
app.post("/login", async (req, res) => {
	const { login, password } = req.body;

	try {
		const newLogin = new Login({
			login,
			password,
		});
		await newLogin.save();
		res.json({
			token: "your-jwt-token-here",
		});
	} catch (error) {
		res.status(500).json({ message: "Ошибка при создании логина", error });
	}
});

// Получение всех мероприятий
app.get("/events", async (req, res) => {
	try {
		const events = await Event.find(); // Находим все мероприятия в базе
		res.json(events);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Ошибка при получении мероприятий", error });
	}
});

// Получение мероприятия по ID
app.get("/events/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const event = await Event.findById(id);
		if (!event) {
			return res.status(404).json({ message: "Мероприятие не найдено" });
		}
		res.json(event);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Ошибка при получении мероприятия", error });
	}
});

// Обновление мероприятия по ID
app.put("/events/:id", async (req, res) => {
	const { id } = req.params;
	const { title, description, date, location, createdBy } = req.body;

	try {
		const updatedEvent = await Event.findByIdAndUpdate(
			id,
			{ title, description, date, location, createdBy },
			{ new: true }, // Возвращает обновлённый документ
		);

		if (!updatedEvent) {
			return res.status(404).json({ message: "Мероприятие не найдено" });
		}

		res.json(updatedEvent);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Ошибка при обновлении мероприятия", error });
	}
});

// Удаление мероприятия по ID
app.delete("/events/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deletedEvent = await Event.findByIdAndDelete(id);
		if (!deletedEvent) {
			return res.status(404).json({ message: "Мероприятие не найдено" });
		}
		res.json({ message: "Мероприятие удалено", deletedEvent });
	} catch (error) {
		res.status(500).json({ message: "Ошибка при удалении мероприятия", error });
	}
});

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});
