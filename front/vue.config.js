const path = require("path");

if (process.env.NODE_ENV !== "production") {
  process.env.VUE_APP_API_HOST = "http://localhost:3000/api";
}

module.exports = {
  outputDir: path.resolve(__dirname, "../back/dist/public")
};
