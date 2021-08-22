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
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //we have a record with the given profile id
          done(null, existingUser);
        } else {
          //take this model instance and save it into database
          new User({ googleId: profile.id }).save().then((user) => {
            done(null, user);
          });
        }
      });
    }
  )
);
