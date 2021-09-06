const mongoose = require("mongoose");
const { ObjectId } = require("bson");
const User = require("../models/userModel");
const Food = require("./FoodModel");
const Favourite = mongoose.model("Favourite", {
  userId: {
    type: ObjectId,
    required: true,
    ref: User,
  },

  FoodId: { type: ObjectId, required: true, ref: Food },
  date: { type: Date, required: true },
});
module.exports = Favourite;
