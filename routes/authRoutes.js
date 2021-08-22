const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
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
