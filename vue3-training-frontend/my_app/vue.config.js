const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },
  devServer: {
    port: 3000,
    host: 'localhost',

    // proxy: {
    //   "/api": {
    //     target: "http://127.0.0.1:8080",
    //   }
    // }
  }
})
