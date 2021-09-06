const mongoose = require("mongoose");
const { ObjectId } = require("bson");
const User = require("./userModel");

const Food = mongoose.model("Food", {
  Foodtitle: { type: String, required: true,default:"" },
  foodimg: { type: String,default:"no-img.jpg" },
  Fooddesc: { type: String, default:"" },
  foodcategory: { type: String, " required": true },
  foodtype: {
    type: String,
    required: true,
    enum: ["Breakfast", "Lunch", "Dinner", "Bakery", "__"],
  },
  foodrating: { type: Number },
  preptime: { type: String, required: true,default:"5 min" },
  userId: { type: ObjectId, ref: User },
});

module.exports = Food;
