const express = require("express");
const router = express.Router();
const Rating = require("../models/rating_model");
const auth = require("../middleware/auth");
const { updateRating } = require("../utils/userUtils");

router.post("/rate/food", auth.verifyAccount, (req, res) => {
  let rating = parseInt(req.body["rating"]);
  let food_id = req.body["foodId"];

  Rating.findOne({ user_id: req.user._id, food_id: food_id }).then(
    (data) => {
      if (data != null) {
        Rating.updateOne(
          { user_id: req.user._id, food_id: food_id },
          { $set: { rating: parseInt(rating) } }
        )
          .then((result) => {
            updateRating(food_id);
            return res.status(200).json({ success: true, message: "Rated!!" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(404).json({ success: false, message: err });
          });
      } else {
        const rate = new Rating({
          user_id: req.user.id,
          food_id: food_id,
          rating: parseInt(rating),
        });
        rate
          .save()
          .then((result) => {
            updateRating(food_id);
            return res.status(200).json({ success: true, message: "Rated!!" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(404).json({ success: false, message: err });
          });
      }
    }
  );
});

router.get("/myRatings", auth.verifyAccount, (req, res) => {
  let query = Rating.find({ user_id: req.user._id });
  query
    .then((data) => {
      if (data.length > 0) {
        return res
          .status(200)
          .json({ message: "Retrieved", data: data, success: true });
      } else {
        return res
          .status(202)
          .json({ message: "Not Retrieved", data: data, success: false });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ message: err, success: false });
    });
});

module.exports = router;
