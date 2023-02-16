const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/assets/styles/setup/variables.scss";
        @import "@/assets/styles/setup/typography.scss";
        @import "@/assets/styles/global.scss";
        `
      },
    }
  }
})
