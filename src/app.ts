import express from "express";
import mongoose from "mongoose";
import usersRoute from "./routes/users-route";

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use("/users", usersRoute);

// app.get("/", (req, res) => {
//   res.send(`<h1 style="color: blueviolet; text-align: center">"HI RUS! Server start on PORT ${PORT}"</h1>`);
// });

app.listen(PORT);
// app.listen(PORT, () => {
//   console.log(`Слушаем порт ${PORT}`);
// });

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");
