module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/globalStyles/_mixins.scss";
        `,
      },
    },
  },
}