const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/assets/styles/variables.scss";
        @import "@/assets/styles/typography.scss";
        @import "@/assets/styles/global.scss";
        `
      },
    }
  }
})
