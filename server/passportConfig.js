const Admin = require("./models/Admin.js");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        // Admin.findOne({ email: email }, (err, user) => {
        //   if (err) throw err;
        //   if (!user) return done(null, false);
        //   bcrypt.compare(password, user.password, (err, result) => {
        //     if (err) throw err;
        //     if (result === true) {
        //       return done(null, user);
        //     } else {
        //       return done(null, false);
        //     }
        //   });
        // });

        try {
          const admin = await Admin.findOne({
            email: email,
          });

          if (!admin) {
            return done(null, false, {message: "Incorrect email or password."});
          }

          if (admin) {
            bcrypt.compare(password, admin.password, (err, result) => {
              if (err) throw err;
              if (result === true) {
                return done(null, admin);
              } else {
                return done(null, false);
              }
            });
          }

          
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    // try {
    //   const data = await Admin.findOne({
    //     _id: id,
    //   });
    //   if (data) {
    //     const adminInformation = {
    //       firstName: data.firstName,
    //       lastName: data.lastName,
    //       email: data.email,
    //     };
    //     cb(err, adminInformation);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const admin = await Admin.findById(id);
        const adminInformation = {
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          role: admin.isAdmin,
        };
        done(null, adminInformation);
      
    } catch (error) {
      done(error);
    }
    
  });
};
