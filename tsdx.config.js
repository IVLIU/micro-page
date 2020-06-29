const postcss = require('rollup-plugin-postcss');
const pxtoviewport = require('postcss-px-to-viewport');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  rollup(config) {
    config.plugins.push(
      postcss({
        modules: true,
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
          pxtoviewport({
            unitToConvert: 'px',
            viewportWidth: 375,
            unitPrecision: 5,
            propList: ['*', '!font*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            landscape: false,
            landscapeUnit: 'vw',
            landscapeWidth: 568
          })
        ],
      })
    );
    return config;
  },
};
