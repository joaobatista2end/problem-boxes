// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-lucide-icons",
    "@nuxtjs/google-fonts",
    "dayjs-nuxt",
  ],
  googleFonts: {
    base64: true,
    fontsDir: "assets/fonts",
    outputDir: "assets",
    overwriting: true,
    families: {
      Poppins: true,
    },
  },
  tailwindcss: {
    cssPath: "assets/css/tailwind.css",
    config: {
      plugins: ["@tailwindcss/line-clamp"],
    },
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    redirect: false,
  },
});
