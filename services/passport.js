const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//creates a new instance👇of the Google passport strategy.
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      new User({ googleId: profile.id }).save();
      //take this model instance and save it into database
    }
  )
);
