// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-security"],
  compatibilityDate: "2024-11-01",
  css: ["~/assets/styles/bootstrap.scss"],
  devtools: { enabled: false },
});
