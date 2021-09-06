const express = require("express");
const router = express.Router();
const Food = require("../models/FoodModel");
const auth = require("../middleware/auth");
const { get } = require("mongoose");
const { check, validationResult } = require("express-validator");
const upload = require("../middleware/upload");

router.post(
  "/Food/insertFood",
  auth.verifyAccount,
  function (req, res) {
    console.log(
      req.body
    )
   
   
        const Foodtitle = req.body.Foodtitle;
      
        const Fooddesc = req.body.Fooddesc;
        const foodcategory = req.body.foodcategory;
        const foodtype = req.body.foodtype;
        const preptime = req.body.preptime;
        const fooddata = new Food({
          Foodtitle: Foodtitle,
        
          Fooddesc: Fooddesc,
          foodcategory: foodcategory,
          foodtype: foodtype,
          preptime: preptime,
          foodrating: 0,
          userId: req.user._id,
        });
        fooddata
          .save()
          .then(function (result) {
            res
              .status(201)
              .json({ message: "New Food Inserted !", success: true, saved:fooddata });
          })
          .catch(function (err) {
            console.log(err);
            res.status(500).json({ error: "err" });
          });
    
  }
);

//update
//id - updated datafrom client
router.put(
  "/food/update",
  upload.single("Foodimg"),
  auth.verifyAccount,
  function (req, res) {
    console.log(req.file)
    if (req.file == undefined) {
      return res
        .status(202)
        .json({ success: false, message: "Inappropriate file format." });
    }
    const id = req.body.id;
    const Foodtitle = req.body.Foodtitle;
    const Foodimg = req.file.path;
    const Fooddesc = req.body.fooddesc;
    const foodcategory = req.body.foodcategory;
    const foodtype = req.body.foodtype;
    const preptime = req.body.preptime;

    Food.updateOne(
      { _id: id },
      {
        Foodtitle: Foodtitle,
        foodimg: Foodimg,
        Fooddesc: Fooddesc,
        foodcategory: foodcategory,
        foodtype: foodtype,
        preptime: preptime,
      }
    )
      .then(function (result) {
        res
          .status(200)
          .json({ message: "data updated successfully !", success: true });
      })
      .catch(function (e) {
        console.log(e);
        res.status(500).json({ error: e });
      });
  }
);

router.put('/update/food',auth.verifyAccount,(req,res)=>{
  let id = req.body.id;
  const Foodtitle = req.body.foodtitle;
  const Fooddesc = req.body.fooddesc;
  const foodcategory = req.body.foodcategory;
  const preptime = req.body.preptime;
  
  Food.findOneAndUpdate({"_id":id},{
    $set:{
      Foodtitle: Foodtitle,
      Fooddesc: Fooddesc,
      foodcategory: foodcategory,
      preptime: preptime
    }
  }).then((result)=>{
    Food.findOne({"_id":id})
    .then((data)=>{
      return res.status(200).json({"success":true,"message":"Food Updated","saved":data})
    })
  
  })
  .catch((err)=>{
    return res.status(404).json({"success":false,"message":err})
  })
})

//delete
router.delete("/food/delete/:id", auth.verifyAccount, function (req, res) {
  const id = req.params.id;
  Food.deleteOne({ _id: id })
    .then(function (result) {
      res
        .status(200)
        .json({ message: "data deleted successfully !", success: true });
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

//get all data
router.get("/food/allrec/:type", function (req, res) {
  let type = req.params.type;
  Food.find({ foodtype: type })
    .then(function (data) {
      // console.log(data);
      res.status(200).json({ success: true, foods: data });
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

router.get("/Food/allrec",auth.verifyAccount, function (req, res) {
  let type = req.params.type;
  Food.find({ userId:req.user._id })
    .then(function (data) {
       console.log(data);
      res.status(200).json({ success: true, Foods: data });
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

//get single data
router.get("/food/selectedrec/:id", auth.verifyAccount, function (req, res) {
  const id = req.params.id;
  Food.findOne({ _id: id })
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});


// router.post(
//   "/food/insertFood",
//   auth.verifyAccount,
  
//   [
//     check("foodtitle", "Title is required for food").not().isEmpty(),
//     check("fooddesc", " Food description is needed").not().isEmpty(),
//     check("foodcategory", "Verify the category of food").not().isEmpty(),
//     check("foodtype", "Meention the type of food").not().isEmpty(),
//     check("preptime", "Tell the preparation time").not().isEmpty(),
//   ],
//   function (req, res) {
//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
       
//         const foodtitle = req.body.foodtitle;
//         const foodimg = "no-img.jpg";
//         const fooddesc = req.body.fooddesc;
//         const foodcategory = req.body.foodcategory;
//         const foodtype = req.body.foodtype;
//         const preptime = req.body.preptime;
//         const fooddata = new Food({
//           foodtitle: foodtitle,
//           foodimg: foodimg,
//           fooddesc: fooddesc,
//           foodcategory: foodcategory,
//           foodtype: foodtype,
//           preptime: preptime,
//           foodrating: 0,
//           userId: req.user._id,
//         });
//         fooddata
//           .save()
//           .then(function (result) {
//             res
//               .status(201)
//               .json({ message: "New Food Inserted !", success: true,"saved":result });
//           })
//           .catch(function (err) {
//             console.log(err);
//             res.status(500).json({ error: "err" });
//           });
      
//     } else {
//       res.status(400).json({ error: errors.array });
//     }
//   }
// );


router.put("/uploadFoodImg/:id",upload.single('Foodimg'),(req,res)=>{
  let id = req.params.id;
  let foodImg = req.file.path;

  Food.updateOne({
    "_id":id
  },
  {
      "foodimg": foodImg
    }
  
  
  
  ).then((result)=>{
    return res.status(200).json({"success":true,"message":"Added"})
  })
  .catch((err)=>{
    return res.status(404).json({"success":false,"message":err})
  })
})



module.exports = router;
