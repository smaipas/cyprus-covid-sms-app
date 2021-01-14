const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "/"),
        "@": path.resolve(__dirname, "src/")
      }
    }
  }
};
