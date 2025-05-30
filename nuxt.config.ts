// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    'nuxt-gtag'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['php', 'bash']
        },
        toc: {
          searchDepth: 1
        }
      }
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true,
      // Avoid Github pages trailing slash bug
      autoSubfolderIndex: false
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    provider: 'iconify'
  },

  llms: {
    domain: 'https://laravel-access-control.lomkit.com/',
    title: 'Laravel Access Control - Lomkit',
    description: 'Laravel Access Control centralizes your application security in one place',
    full: {
      title: 'Laravel Access Control - Full Documentation',
      description: 'Complete documentation for Laravel Access Control by Lomkit'
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' }
        ]
      },
      {
        title: 'Essentials',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/essentials%' }
        ]
      }
    ]
  }
})
