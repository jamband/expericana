module.exports = {
  plugins:
    process.env.NODE_ENV === "production"
      ? [
          "postcss-flexbugs-fixes",
          [
            "postcss-preset-env",
            {
              autoprefixer: {
                flexbox: "no-2009",
              },
              stage: 3,
              features: {
                "custom-properties": false,
              },
            },
          ],
          [
            "@fullhuman/postcss-purgecss",
            {
              content: [
                "./node_modules/@fortawesome/fontawesome-svg-core/index.js",
                "./node_modules/bootstrap/js/dist/collapse.js",
                "./node_modules/bootstrap/js/dist/dropdown.js",
                "./node_modules/lazysizes/lazysizes.js",
                "./src/**/*.tsx",
              ],
              defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
              safelist: ["html", "body"],
            },
          ],
        ]
      : [["postcss-preset-env", { stage: false }]],
};
