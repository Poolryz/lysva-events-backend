import Event from "../models/Event.js";

// Получение мероприятия по ID
export const getEventId = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Мероприятие не найдено" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении мероприятия", error });
  }
};

// Обновление мероприятия по ID
export const putEventId = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, createdBy } = req.body;
  let image = req.body.image;

  // Проверяем, было ли загружено новое изображение
  if (req.file) {
    image = `uploads/${req.file.filename}`; // Обновляем путь к файлу изображения
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date, location, createdBy, image },
      { new: true }, // Возвращает обновлённый документ
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Мероприятие не найдено" });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении мероприятия", error });
  }
};

// Удаление мероприятия по ID
export const deleteEventId = async (req, res) => {
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
};
