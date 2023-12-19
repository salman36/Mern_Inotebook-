import express from "express";
import cors from "cors";
// import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import notesRouter from "./routes/notesRoute.js";

import { middleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

////////// for test end point to check connection ///////
// app.use('/',(req,res)=>{
//     res.send("hello");
// })

app.use("/uploads", express.static("uploads"));
// Products Apis
// app.use("/api", productRouter);
app.use("/api/auth", userRouter);
app.use("/api/auth/notes", notesRouter);

//Error handler middleware
app.use(middleware);

export default app;

