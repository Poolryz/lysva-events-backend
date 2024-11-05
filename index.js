import express from "express";
import cors from "cors";
import path from "path";
import eventRoutes from './routes/eventsRoutes.js';
import eventIdRouters from "./routes/eventIdRoutes.js";
import connectDB from "./config/db.js";
import loginRoutes from "./routes/loginRoutes.js";

connectDB()
const app = express();
const port = 3000;
const __dirname = path.resolve();
app.use(cors({
  origin: 'https://lysvalife.ru', // Разрешаем запросы только с https://lysvalife.ru
  methods: 'GET, POST, PUT, DELETE', // Указываем разрешенные методы
  allowedHeaders: 'Content-Type, Authorization' // Указываем разрешенные заголовки
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/events', eventRoutes);
app.use('/events', eventIdRouters);
app.use('/', loginRoutes);
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
