const path = require(`path`);

module.exports = {
  entry: [
    `./js/main.js`,
    `./js/card.js`,
    `./js/filter.js`,
    `./js/pin.js`,
    `./js/message.js`,
    `./js/backend.js`,
    `./js/form.js`,
    `./js/move.js`,
    `./js/debounce.js`,
    `./js/map.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
