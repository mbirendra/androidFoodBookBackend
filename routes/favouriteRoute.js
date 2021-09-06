const express = require("express");
const Favourite = require("../models/FavouriteModel");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/add/favourite", auth.verifyAccount, (req, res) => {
  var foodId = req.body.foodId;
  let query = Favourite.findOne({ userId: req.user._id, foodId: foodId });
  query
    .then((data) => {
      if (data != null) {
        Favourite.deleteOne({ _id: data._id })
          .then((result) => {
            return res.status(200).json({ success: true, message: "Deleted" });
          })
          .catch((err) => {
            return res.status(404).json({ success: false, message: err });
          });
      } else {
        let fav = new Favourite({
          userId: req.user._id,
          foodId: foodId,
          date: new Date(),
        });
        fav
          .save()
          .then((data) => {
            return res.status(200).json({ success: true, message: "Added" });
          })
          .catch((err) => {
            return res.status(404).json({ success: false, message: err });
          });
      }
    })
    .catch((err) => {
      return res.status(404).json({ success: false, message: err });
    });
});

router.get("/retrieveSave", auth.verifyAccount, (req, res) => {
  Favourite.find({ userId: req.user._id })
    .sort({ date: -1 })
    .populate({
      path: "userId",
    })
    .populate({
      path: "foodId",
    })
    .then((data) => {
      if (data.length > 0) {
        return res.status(200).json({ success: true, data: data });
      } else {
        return res.status(202).json({ success: false, data: data });
      }
    })
    .catch((err) => {
      return res.status(404).json({ success: false, message: err });
    });
});

module.exports = router;
