const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (Home) {
  Home.use(
    "/api",
    createProxyMiddleware({
    target: "http://127.0.0.1:8000",
      changeOrigin: true,
    })
  );
};
