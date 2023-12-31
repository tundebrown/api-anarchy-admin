const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require('path');
const userRoutes = require("./routes/user.js");
const friendRoutes = require("./routes/friendship.js");
const friendInfoRoutes = require("./routes/friendshipinfo.js");
const userStatsInfoRoutes = require("./routes/userstatsinfo.js");
const matchStatsRoutes = require("./routes/matchstats.js");
const overallUserStatsRoutes = require("./routes/overalluserstats.js");
const adminRoutes = require("./routes/admin.js");
const generalRoutes = require("./routes/general");
const authRoutes = require("./routes/auth");
const MongoStore = require("connect-mongo");
// const loginAuthRoutes = require("./routes/authLogin");

// data imports
// import User from "./models/User.js";

// import {
//   dataUser,
// } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet.contentSecurityPolicy({
  directives: {
defaultSrc: ["'self'", '*'],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*'],
      styleSrc: ["'self'", "'unsafe-inline'", '*'],
      imgSrc: ["'self'", '*', 'data:'],
      fontSrc: ["'self'", '*'],
      connectSrc: ["'self'", '*'],
      mediaSrc: ["'self'", '*'],
      objectSrc: ["'none'"],
},
}));

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_URL, // <-- location of the react app were connecting to
    credentials: true,
  })
);
// app.use(cors());
app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    // cookie: {
    //   domain: process.env.PRD_URL,
    //   secure: true,
    //   sameSite: "none",
    // },
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// Static react app
// Serve the static React build
app.use(express.static(path.join(__dirname, '/frontend')));

/* ROUTES */
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api/stats", userStatsInfoRoutes);
app.use("/api/stats", overallUserStatsRoutes);
app.use("/api/report", friendRoutes);
app.use("/api/report", friendInfoRoutes);
app.use("/api/report", matchStatsRoutes);
app.use("/general", generalRoutes);
app.use("/api/v1/register", authRoutes);
// app.use("/api/v1/login", loginAuthRoutes);

app.post("/api/v1/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Email or password incorrect");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log("Successfully authenticated");
      });
    }
  })(req, res, next);
});

// let user = {email: "Admin", firstName: "Admin", lastName: "Admin"};
app.get("/api/v1/authadmin", (req, res) => {
  
  if (req.isAuthenticated()) {
    // Access user data via req.user
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
    console.log("User is authenticated");
    // const user = req.user;
    // res.render('profile', { user });
  } else {

    console.log("User is not authenticated");
  }
});

app.get("/api/v1/authadmin/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    // res.redirect('/');
    res.status(200).send("Logged out successfully");
  });
  // req.session.destroy();

  req.session.destroy(function (err) {
    if (!err) {
      res
        .status(200)
        .clearCookie("connect.sid", { path: "/" })
        .json({ status: "Success" });
    } else {
      // handle error case...
    }
  });
  // res.redirect('/')
});


//For production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// app.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send("No User Exists");
//     else {
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.send("Successfully Authenticated");
//         console.log(req.user);
//       });
//     }
//   })(req, res, next);
// });

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
