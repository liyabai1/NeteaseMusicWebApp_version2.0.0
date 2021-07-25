module.exports = {
  lintOnSave: false,
  publicPath: './',
  css: {
    loaderOptions: {
      // sass: {
      //   perpendData: `@import '@/style/variable.scss';`
      // },
      scss: {
        prependData: `
          @import '@/style/variable.scss';
          @import '@/style/mixin.scss';
        `
      }
    }
  }
}
