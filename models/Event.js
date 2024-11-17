import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  endDate: { type: Date }, // Для указания окончания периода
  time: { type: String }, // Время проведения
  dateType: { type: String, enum: ["single", "range"], default: "single" }, // Тип даты
  location: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  image: { type: String }, // Путь к изображению
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
