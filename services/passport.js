const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//creates a new instance👇of the Google passport strategy.
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");
passport.serializeUser((user, done) => {
  done(
    null, //error object,
    user.id //_id from mongodb
  );
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        //we have a record with the given profile id
        return done(null, existingUser);
      }
      //take this model instance and save it into database
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
// const passport = require("passport"); // imports Passport JS package
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const mongoose = require("mongoose");
// const keys = require("../config/keys.js");

// // creates a model class called "User"
// const User = mongoose.model("users");

// // User OAuth handled by Passport JS
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: "/auth/google/callback", // route that user is redirected to when he/she grants authorisation
//       proxy: true, // enables Google to trust proxy and handle callback URL accordingly (ie. HTTP/HTTPS)
//     },

//     // #1: Promise
//     // (accessToken, refreshToken, profile, done) => {
//     //   console.log("profile:", profile);

//     //   // searches in User for the first record where googleId === profile.id
//     //   User.findOne({ googleId: profile.id }).then(existingUser => {
//     //     if (existingUser) {
//     //       done(null, existingUser); // no action required as there is an existing record of the given profile ID
//     //     } else {
//     //       new User({ googleId: profile.id })
//     //         .save()
//     //         .then(user => done(null, user));
//     //     }
//     //   })
//     // }

//     // #2: Refactoring with Async/Await
//     async (accessToken, refreshToken, profile, done) => {
//       console.log("profile:", profile);
//       const existingUser = await User.findOne({ googleId: profile.id });
//       if (existingUser) {
//         done(null, existingUser);
//       } else {
//         const user = await new User({ googleId: profile.id }).save();
//         done(null, user);
//       }
//     }
//   )
// );

// // Serialises the newly generated user (from above function) with some unique identifier and sets cookie
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialises user by taking the same unique identifier in cookie and converts it back to a Mongoose model instance
// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });
