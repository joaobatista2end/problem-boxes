// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-lucide-icons',
    '@nuxtjs/google-fonts',
    'dayjs-nuxt',
  ],
  googleFonts: {
    base64: true,
    fontsDir: 'assets/fonts',
    outputDir: 'assets',
    overwriting: true,
    families: {
      Poppins: [400, 600, 800],
    },
  },
  tailwindcss: {
    cssPath: 'assets/css/tailwind.css',
    config: {
      plugins: ['@tailwindcss/line-clamp'],
      content: [
        `./components/**/*.{vue,js,ts}`,
        `./modules/**/*.{vue,js,ts}`,
        `./layouts/**/*.vue`,
        `./pages/**/*.vue`,
        `./composables/**/*.{js,ts}`,
        `./plugins/**/*.{js,ts}`,
        `./utils/**/*.{js,ts}`,
        `./App.{js,ts,vue}`,
        `./app.{js,ts,vue}`,
        `./Error.{js,ts,vue}`,
        `./error.{js,ts,vue}`,
        `./app.config.{js,ts}`,
      ],
    },
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    redirect: false,
  },
});
