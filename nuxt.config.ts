// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@tresjs/nuxt', '@unocss/nuxt', '@vueuse/nuxt', 
    // '@nuxt/fonts',
     '@pinia/nuxt', 'pinia-plugin-persistedstate'],
  ssr: false,
  unocss: {
    attributify: true,
    icons: true,
    components: false,
    shortcuts: [
      ['fullScreen', 'w-screen h-screen'],
      ['flexCenter', 'flex justify-center items-center'],
      ['grain-yellow', 'grain-color-[rgba(255,255,0,0.3)]'],
      ['circle', 'w-10 h-10 rounded-full bg-blue-500'],
    ],
    rules: [
      [/^grain-color-(.+)$/, ([, c]) => ({
        filter: 'contrast(170%) brightness(100%)',
        background: `
          linear-gradient(0deg, ${c}, ${c}),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 166 166' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.14' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
        `,
        'background-blend-mode': 'multiply',
      })],
    ],
  },
  // fonts: {
  //   priority: ['fontshare', 'bunny', 'local'
  //   ],
  // },
  vite: {
    define: {
      "window.global": {},
    },
  },
  devServer: {
    port: 4444,
    // https: true
  },
  nitro: {
    experimental: {
      websocket: true
    }
  }
})
