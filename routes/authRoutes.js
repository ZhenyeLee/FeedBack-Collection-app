const passport = require("passport");

module.exports = (app) => {
  // Once user enters through specified route (i.e. "/auth/google"), Passport JS is to authenticate user via a strategy called "Google"
  // Scope specifies the types of access that is obtained from user's profile
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // When user gets redirected to "/auth/google/callback", route handler takes user's request and conducts code exchange
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys"); // redirects user to surveys route after signing in
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // request ➡️ Cookie-session  ➡️   Passport  ➡️     deserialize    ➡️   User model instance added to
  //             extract           Pulls user        turn user id        req object as 'req.user'
  //           cookie data   id out of cookie data   into a user

  //Req represents the incoming request.
  //Res represents the outgoing response.
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
