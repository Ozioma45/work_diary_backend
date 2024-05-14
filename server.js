const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");
const UserRoutes = require("./routes/user");
const mongoose = require("mongoose");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//route handler_react to request
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", UserRoutes);

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
