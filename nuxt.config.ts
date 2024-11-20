// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [ "bootstrap/dist/css/bootstrap.min.css",
        // "bootstrap/js/dist/offcanvas.js",
         "bootstrap-icons/font/bootstrap-icons.min.css"],
  
  supabase: {
    redirect: true
  },
  modules: ["@nuxtjs/supabase"]
})
