const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        // Use `additionalData` instead of `prependData`
        additionalData: `@import "@/assets/styles/_variables.scss";`,
      },
    },
  },
});
