const express = require("express");
const { findSourceMap } = require("module");
const { runInNewContext } = require("vm");
const User = require("../models/userModel");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const {validate} = require("../utils/validation")
router.post(
  "/user/register",

  [
    check("fullname", "Fullname is required").not().isEmpty(),
    check("email", "Email address required").not().isEmpty(),
    check("email", "Invalid Email address").isEmail(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be al least 6 characters long")
      .not()
      .isEmpty({ min: 6 }),
  ],
  function (req, res) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const Fullname = req.body.fullname;
      const Email = req.body.email;
      const Username = req.body.username;
      const Password = req.body.password;

      User.find({}).then((data)=>{
        var validation2 = validate({email:Email,username:Username},data);
        if(validation2 == true)
        {
          bcryptjs.hash(Password, 10, function (err, hash) {
            const data = new User({
              fullname: Fullname,
              email: Email,
              username: Username,
              password: hash,
            });
            data
              .save()
              .then(function (result) {
                //success message with status code
                res.status(201).json({ success: true, message: "Registered" });
              })
              .catch(function (err) {
                res.status(500).json({ error: err });
              });
          });
        }
        else
        {
          return res.status(202).json({"success":false,"message":validation2})
        }
      })

    
    } else {
      //invalid data from the client
      res.status(202).json({ message: errors.array()[0].msg,success:false});
    }
  }
);

//let's create a login system

router.post("/user/login", function (req, res) {
  const Username = req.body["username"];
  const Password = req.body["password"];
  console.log(Username);
  console.log(Password);

  User.findOne({ username: Username })
    .then(function (UserData) {
      if (UserData == null) {
        //username not found..
        return res
          .status(202)
          .json({ success: false, message: "Username not found !" });
      }
      // let's now compare new password

      bcryptjs.compare(Password, UserData.Password, function (err, message) {
        if (message == false) {
          //username correct/ password incorrect
          return res
            .status(202)
            .json({ success: false, message: "Incorrect Password" });
        } else {
          //npw let's generate token
          var token = jwt.sign({ userId: UserData._id }, "secretkey");
          console.log("Login success");
          res.status(200).json({
            token: token,
            message: "Authorization succeed !",
            success: true,
            usertype: UserData.Usertype,
            _id:UserData._id
          });
        }
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.delete("/UserDelete/:id", function (req, res) {
  const id = req.params.id;
  User.deleteOne({ _id: id }).then(function () {
    res.send("Deleted successfully!!");
  });
});

router.put("/UserUpdate/:id", function (req, res) {
  const id = req.params.id;
  const name = req.body.name;
  User.updateOne({ _id: id }, { FullName: name }).then(function () {
    res.send("Updated successfully!!");
  });
});

module.exports = router;
