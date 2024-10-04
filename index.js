const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const mongoose = require("mongoose");
const Event = require("./models/Event");
const jwt = require("jsonwebtoken");
const Login = require("./models/Login");

const JWT_SECRET = "your-secret-key"; // Секрет для генерации токенов (должен быть более сложным и безопасным в реальном проекте)

// Middleware
app.use(cors());
app.use(express.json()); // Для обработки JSON данных

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1]; // Достаём токен из заголовка

	if (!token) return res.sendStatus(401); // Если токена нет, возвращаем 401 Unauthorized

	// Проверяем валидность токена
	jwt.verify(token, "your-secret-key", (err, user) => {
		if (err) return res.sendStatus(403); // Если токен невалиден, возвращаем 403 Forbidden
		req.user = user; // Сохраняем данные пользователя для дальнейшего использования
		next(); // Переходим к следующему middleware или маршруту
	});
}

// Пример защищенного маршрута
app.get("/protected-route", authenticateToken, (req, res) => {
	res.json({ message: "Доступ разрешен", user: req.user });
});

// Подключаемся к MongoDB
mongoose
	.connect(
		"mongodb+srv://savinovdanil:120698daOKLICKMQVGYJkb@cluster0.g1ybj.mongodb.net/lysva-events?retryWrites=true&w=majority&appName=Cluster0",
	)
	.then(() => console.log("MongoDB подключена"))
	.catch((err) => console.log("Ошибка подключения к MongoDB:", err));

//Создание маршрутов (routes)
app.post("/events", authenticateToken, async (req, res) => {
	const { title, description, date, location, createdBy } = req.body;

	try {
		const newEvent = new Event({
			title,
			description,
			date,
			location,
			createdBy: req.user.username,
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
		// Находим пользователя по логину и паролю
		const user = await Login.findOne({ login, password });

		if (!user) {
			return res.json({ message: "Неверный логин или пароль" });
		}

		// Генерация JWT-токена
		const token = jwt.sign(
			{ userId: user._id, login: user.login }, // Данные для включения в токен
			JWT_SECRET, // Секретный ключ
			{ expiresIn: "1h" }, // Время жизни токена
		);

		// Возвращаем токен клиенту
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: "Ошибка на сервере", error });
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
