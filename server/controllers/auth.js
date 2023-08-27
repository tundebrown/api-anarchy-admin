const bcrypt = require("bcryptjs");
const express = require("express");
const Admin = require("../models/Admin.js");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();


// app.use(
//   session({
//     secret: "secretcode",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(cookieParser("secretcode"));
// app.use(passport.initialize());
// app.use(passport.session());
// require("../passportConfig")(passport);

const registerAdmin = async (req, res) => {
  try {
    const data = await Admin.findOne({
      email: req.body.email,
    });

    if (data) {
      res.send("Admin Already Exists");
    }

    if (!data) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let isAdmin;
      // if (req.body.isAdmin === "isAdmin") {
      //   isAdmin = true;
      // } else {
      //   isAdmin = false;
      // }

      const newAdmin = new Admin({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin,
      });
      await newAdmin.save();
      res.send("Admin Created");
    }
  } catch (error) {
    console.log(error);
  }
};


// const loginAdmin = async (req, res, next) => {
//   passport.authenticate("local", (err, admin, info) => {
//     if (err) throw err;
//     if (!admin) res.send("No User Exists");
//     else {
//       req.logIn(admin, (err) => {
//         if (err) throw err;
//         res.send("Successfully Authenticated");
//         console.log(req.admin);
//       });
//     }
//   })(req, res, next);
// };

module.exports = {
  registerAdmin,
  // loginAdmin
};
