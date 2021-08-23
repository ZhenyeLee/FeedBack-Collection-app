//
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    ///auth/google also takes care /auth/google/callback
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
