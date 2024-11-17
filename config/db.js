import mongoose from "mongoose";

const urls = {
  localhost: "mongodb://localhost:27017/lysva-events",
  public:
    "mongodb+srv://savinovdanil:120698daOKLICKMQVGYJkb@cluster0.g1ybj.mongodb.net/lysva-events?retryWrites=true&w=majority&appName=Cluster0",
};

function urlChanger() {
  let dev = false;
  return dev ? urls.localhost : urls.public;
}

const connectDB = async () => {
  mongoose
    .connect(urlChanger())
    .then(() => console.log("MongoDB подключена"))
    .catch((err) => console.log("Ошибка подключения к MongoDB:", err));
};

export default connectDB;
