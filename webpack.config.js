const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    content: "./src/content/content.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  mode: "development",
  watch: false,
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "static",
          globOptions: {
            gitignore: true,
          },
        },
      ],
    }),
  ],
};
