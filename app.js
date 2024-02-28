const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const Poem = require("./models/poem");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userRoutes = require("./routes/userRoutes");
const poemRoutes = require("./routes/poemRoutes");

mongoose.connect("mongodb://127.0.0.1:27017/poems")
    .then(() => {
        console.log("Database is connected");
    })
    .catch(e => {
        console.log("Connection Failed!");
        console.log(e);
    });

app.use(express.json());
app.use("/auth", userRoutes);
app.use("/poems", poemRoutes);

app.listen(3000, () => {
    console.log("Server Connected!");
});