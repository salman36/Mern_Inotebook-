import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/inotebook")
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log("errer while connecting DB" + err);
    });
};

export default connectDb;
