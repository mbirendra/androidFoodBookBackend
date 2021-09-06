const Food = require("../models/FoodModel");
const Rating = require("../models/rating_model");

const updateRating = (foodId) => {
  let query = Rating.find({ food_id: foodId });
  query.then((data) => {
    if (data.length > 0) {
      let ratings = data.map((val) => {
        return val["rating"];
      });
      let totalRatings = 0;
      for (var i = 0; i < ratings.length; i++) {
        totalRatings += ratings[i];
      }
      let averageRating = parseInt(Math.round(totalRatings / ratings.length));
      Food.updateOne(
        { _id: foodId },
        { $set: { foodrating: averageRating } }
      )
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      Food.updateOne({ _id: foodId }, { $set: { foodrating: 0 } })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

module.exports = { updateRating };
