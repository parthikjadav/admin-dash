import mongoose from "mongoose";
import config from "./env";

const connectDB = () => {
  mongoose
    .connect(config.MONGO_URI as string)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
}

export default connectDB;