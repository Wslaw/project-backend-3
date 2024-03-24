import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});



const DB_HOST = "mongodb+srv://UserContacts:UserContacts@cluster0.bqahw9l.mongodb.net/my-contacts?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3003, () => {
      console.log("Server is running. Use our API on port: 3003");
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// UserContacts