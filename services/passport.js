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
