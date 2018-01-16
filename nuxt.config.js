module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "crypto-faucets",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" },
      { rel: "stylesheet", href: "https://unpkg.com/bootstrap-vue@1.4.1/dist/bootstrap-vue.css" }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        /*
        config.module.rules.push({
          enforce: "pre",
          test: /\.js$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
        */
      }
    },
    vendor: []
  },
  modules: [
    "modules/typescript.ts",
    ["bootstrap-vue/nuxt", { css: false, bvCSS: false }]
  ],
  generate: {
    dir: "docs",
    routes: function (callback) {
      const routes = [
        "/",
        "/about",
        "/changelog",
        "/currencies/"
      ];
      require("./assets/data/currencies.json").forEach((w) => {
        routes.push(`/currencies/${w.name.toLocaleLowerCase().replace(" ", "-")}`);
      });
      callback(null, routes);
    },
    interval: 500
  },
  router: {
    base: "/crypto-faucets/"
  }
}
