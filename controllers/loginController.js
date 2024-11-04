import Login from "../models/Login.js"; 
import User from '../models/User.js';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

export const login = async (req, res) => {
  const { login, password } = req.body;

  try {
    // Находим пользователя по логину
    const user = await Login.findOne({ login });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Неверный логин или пароль" });
    }

    // Генерация JWT-токена
    const token = jwt.sign(
      { userId: user._id, login: user.login }, // Данные для включения в токен
      JWT_SECRET, // Секретный ключ
      { expiresIn: "168h" }, // Время жизни токена
    );

    // Возвращаем токен клиенту
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка на сервере", error });
  }
};


export const getinfo = async (req, res) => {
  try {
      const userId = req.user.userId; // Получаем ID из авторизации
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'Пользователь не найден' });
      }

      res.json(user);
  } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
      res.status(500).json({ message: 'Ошибка сервера' });
  }
};

