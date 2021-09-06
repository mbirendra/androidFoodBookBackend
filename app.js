const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/db");
const cors = require("cors");
const path = require("path");

const user_route = require("./routes/user_route");
const FoodRoute = require("./routes/FoodRoute");
const RatingRoute = require("./routes/RatingRoute");
const FavouriteRoute = require("./routes/favouriteRoute");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
// app.use(express.static("images"));

app.use(user_route);
app.use(FoodRoute);
app.use(RatingRoute);
app.use(FavouriteRoute);
app.listen(88);
